package com.sdust.iotroniks.data.prefs

import android.content.Context
import android.content.SharedPreferences
import android.preference.PreferenceManager
import com.sdust.iotroniks.data.DataManagerHelper

class AppPreferenceHelper(context: Context) : DataManagerHelper {

  private val sharedPreferences: SharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)

  init {

  }
  
  override fun setCurrentUserEmail(email: String) {
    this.sharedPreferences.edit().putString(PREF_KEY_CURRENT_USER_EMAIL, email).apply()
  }

  override fun getCurrentUserEmail(): String {
    return this.sharedPreferences.getString(PREF_KEY_CURRENT_USER_EMAIL, "")
  }

  companion object {
    private val PREF_KEY_CURRENT_USER_EMAIL = "PREF_KEY_CURRENT_USER_EMAIL"
  }

  override fun getIncidents(loadIncidentsCallback: DataManagerHelper.LoadIncidentsCallback) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun getOccurrences(loadOccurrenceCallback: DataManagerHelper.LoadOccurrenceCallback) {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }
}
