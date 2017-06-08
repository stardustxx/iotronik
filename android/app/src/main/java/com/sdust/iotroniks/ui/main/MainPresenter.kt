package com.sdust.iotroniks.ui.main

import android.util.Log
import com.google.firebase.auth.FirebaseAuth
import com.sdust.iotroniks.data.AppDataManagerHelper
import com.sdust.iotroniks.data.DataManagerHelper
import com.sdust.iotroniks.data.Incident

internal class MainPresenter(
    private val appDataManagerHelper: AppDataManagerHelper,
    private val mainView: MainContract.View
) : MainContract.Presenter {

  private val TAG: String = "MainPresenter"
  private val firebaseAuth: FirebaseAuth = FirebaseAuth.getInstance()

  init {
    mainView.setPresenter(this)
  }

  override fun start() {
    mainView.showNoIncidents()
    if (firebaseAuth.currentUser != null) {
      proceed()
    } else {
      firebaseAuth.signInWithEmailAndPassword("iotronik-android@gmail.com", "iotronik").addOnCompleteListener { task ->
        if (task.isSuccessful) {
          proceed()
        }
      }
    }
  }

  fun proceed() {
    loadIncidents()
    loadOccurrences()
  }

  override fun result(requestCode: Int, resultCode: Int) {

  }

  override fun loadIncidents() {
    appDataManagerHelper.getIncidents(object : DataManagerHelper.LoadIncidentsCallback {
      override fun onIncidentsLoaded(incidentList: List<Incident>) {
        mainView.showIncidents(incidentList)
      }
    })
  }

  override fun loadOccurrences() {
    appDataManagerHelper.getOccurrences(object : DataManagerHelper.LoadOccurrenceCallback {
      override fun onOccurrenceLoaded(incidentList: List<Incident>) {
//        if (incidentList.isNotEmpty()) {
//          for (i in 0..incidentList.size - 1) {
//            Log.d(TAG, incidentList[i].image)
//          }
//        }
      }
    })
  }
}
