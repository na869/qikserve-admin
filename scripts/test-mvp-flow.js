
const admin = require('firebase-admin');

// IMPORTANT: Before running, you must create and download a service account key
// from your Firebase project settings and place it in the `lib` directory.
// Go to Project Settings > Service accounts > Generate new private key.
const serviceAccount = require('../lib/firebaseServiceAccount.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const TEST_BOOKING_ID = 'test-mvp-booking-123';
const TEST_VENDOR_ID = 'vendor-test-999';
const TEST_VENDOR_NAME = 'Test Vendor Pro';

async function runIntegrationTest() {
  console.log('🚀  Starting MVP Integration Test...');

  try {
    //
    // 1. CREATE (Simulate Customer Booking)
    //
    console.log('  [1/4] Simulating Customer: Creating a new test booking...');
    const bookingPayload = {
      customerName: "Test Customer",
      serviceType: "testing",
      serviceDetails: "Full System Audit",
      amount: 101,
      address: "123 Debug Lane, Codeville",
      bookingDate: "2024-10-27",
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      vendorId: null, // Initially unassigned
      vendorName: null
    };
    await db.collection('bookings').doc(TEST_BOOKING_ID).set(bookingPayload);
    console.log(`    ✅  SUCCESS: Created booking with ID: ${TEST_BOOKING_ID}`);

    //
    // 2. ASSIGN (Simulate Admin Assignment)
    //
    console.log('  [2/4] Simulating Admin: Assigning a vendor to the booking...');
    await db.collection('bookings').doc(TEST_BOOKING_ID).update({
      vendorId: TEST_VENDOR_ID,
      vendorName: TEST_VENDOR_NAME,
      status: 'confirmed'
    });
    console.log(`    ✅  SUCCESS: Assigned Vendor ID: ${TEST_VENDOR_ID}`);

    //
    // 3. VERIFY (Simulate Vendor View)
    //
    console.log('  [3/4] Simulating Vendor: Querying for assigned jobs...');
    const vendorQuery = db.collection('bookings').where('vendorId', '==', TEST_VENDOR_ID);
    const vendorSnapshot = await vendorQuery.get();

    if (vendorSnapshot.empty) {
      throw new Error('VERIFICATION FAILED: Vendor query returned no documents.');
    }

    let foundTestBooking = false;
    vendorSnapshot.forEach(doc => {
      if (doc.id === TEST_BOOKING_ID) {
        foundTestBooking = true;
        console.log(`    ✅  SUCCESS: Vendor successfully found the assigned job.`);
      }
    });

    if (!foundTestBooking) {
      throw new Error('VERIFICATION FAILED: Vendor could not find the specific test booking.');
    }

    //
    // 4. CLEANUP
    //
    console.log('  [4/4] Final Step: Cleaning up test data...');
    await db.collection('bookings').doc(TEST_BOOKING_ID).delete();
    console.log(`    ✅  SUCCESS: Deleted test booking.`);

    //
    // FINAL RESULT
    //
    console.log('\n----------------------------------');
    console.log('✅  ALL SYSTEMS GO. The MVP integration test completed successfully.');
    console.log('----------------------------------\n');
    process.exit(0);

  } catch (error) {
    console.error('\n----------------------------------');
    console.error('❌  TEST FAILED:', error.message);
    console.error('----------------------------------\n');
    
    // Attempt to clean up even on failure
    await db.collection('bookings').doc(TEST_BOOKING_ID).delete().catch(() => {});
    process.exit(1);
  }
}

runIntegrationTest();
