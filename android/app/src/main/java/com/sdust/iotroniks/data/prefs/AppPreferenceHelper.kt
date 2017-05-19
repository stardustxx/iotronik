package com.sdust.iotroniks.data.prefs

import android.content.Context
import android.content.SharedPreferences
import android.preference.PreferenceManager

class AppPreferenceHelper(context: Context) : PreferenceHelper {

    private val sharedPreferences: SharedPreferences

    init {
        this.sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)
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
}
