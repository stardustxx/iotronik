package com.sdust.iotroniks.data.server

import android.content.Context
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.sdust.iotroniks.data.Incident

class AppServerPreferenceHelper(context: Context) : ServerPreferenceHelper {

  private var firebaseReference: DatabaseReference = FirebaseDatabase.getInstance().getReference()

  init {

  }

  override fun getIncidents(): MutableList<Incident> {

  }
}