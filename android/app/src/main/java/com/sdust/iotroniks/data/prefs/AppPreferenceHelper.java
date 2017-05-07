package com.sdust.iotroniks.data.prefs;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

public class AppPreferenceHelper implements PreferenceHelper {

  private static final String PREF_KEY_CURRENT_USER_EMAIL = "PREF_KEY_CURRENT_USER_EMAIL";

  private final SharedPreferences sharedPreferences;

  public AppPreferenceHelper(Context context) {
    this.sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context);
  }

  @Override
  public void setCurrentUserEmail(String email) {
    this.sharedPreferences.edit().putString(PREF_KEY_CURRENT_USER_EMAIL, email).apply();
  }

  @Override
  public String getCurrentUserEmail() {
    return this.sharedPreferences.getString(PREF_KEY_CURRENT_USER_EMAIL, "");
  }
}
