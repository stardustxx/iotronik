package com.sdust.iotroniks.data.server

import android.util.Log
import com.google.firebase.database.*
import com.sdust.iotroniks.data.DataManagerHelper
import com.sdust.iotroniks.data.Incident

class AppServerHelper : DataManagerHelper {

  private val TAG: String = "AppServerHelper"
  private var firebaseReference: DatabaseReference = FirebaseDatabase.getInstance().reference
  private var OccurrenceList: MutableList<Incident> = mutableListOf()

  init {

  }

  override fun getIncidents(loadIncidentsCallback: DataManagerHelper.LoadIncidentsCallback) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun getOccurrences(loadOccurrenceCallback: DataManagerHelper.LoadOccurrenceCallback) {
    firebaseReference.child("occurrence").addValueEventListener(object : ValueEventListener {
      override fun onCancelled(error: DatabaseError?) {
        Log.e(TAG, error.toString())
      }

      override fun onDataChange(dataSnapshots: DataSnapshot?) {
        if (dataSnapshots != null) {
          for (dataSnapshot: DataSnapshot in dataSnapshots.children) {
            val incident: Incident = dataSnapshot.getValue(Incident::class.java)
            Log.d(TAG, incident.image)
            OccurrenceList.add(incident)
          }

          loadOccurrenceCallback.onOccurrenceLoaded(OccurrenceList.toList())
        }
      }
    })
  }

  override fun setCurrentUserEmail(email: String) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun getCurrentUserEmail(): String {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }
}