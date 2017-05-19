package com.sdust.iotroniks.data

import android.content.Context

import com.sdust.iotroniks.data.prefs.AppPreferenceHelper

import java.util.ArrayList

class AppDataManagerHelper(context: Context) : DataManagerHelper {

  private val appPreferenceHelper: AppPreferenceHelper

  init {
    this.appPreferenceHelper = AppPreferenceHelper(context)
  }

  override fun getIncidents(loadIncidentsCallback: DataManagerHelper.LoadIncidentsCallback) {
    val incidents = ArrayList<Incident>()
    loadIncidentsCallback.onIncidentsLoaded(incidents)
  }

  var currentEmail: String
    get() = appPreferenceHelper.currentUserEmail
    set(email) {
      appPreferenceHelper.currentUserEmail = email
    }
}
