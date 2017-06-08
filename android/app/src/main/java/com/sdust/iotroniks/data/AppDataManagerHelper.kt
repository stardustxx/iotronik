package com.sdust.iotroniks.data

import android.content.Context
import com.sdust.iotroniks.data.prefs.AppPreferenceHelper
import com.sdust.iotroniks.data.server.AppServerHelper

class AppDataManagerHelper(context: Context) : DataManagerHelper {

  private val appPreferenceHelper: AppPreferenceHelper = AppPreferenceHelper(context)
  private val appServerHelper: AppServerHelper = AppServerHelper()

  init {

  }

  override fun getIncidents(loadIncidentsCallback: DataManagerHelper.LoadIncidentsCallback) {

  }

  override fun getOccurrences(loadOccurrenceCallback: DataManagerHelper.LoadOccurrenceCallback) {
    appServerHelper.getOccurrences(loadOccurrenceCallback)
  }

  override fun setCurrentUserEmail(email: String) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun getCurrentUserEmail(): String {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  var currentEmail: String
    get() = appPreferenceHelper.getCurrentUserEmail()
    set(email) {
      appPreferenceHelper.setCurrentUserEmail(email)
    }
}
