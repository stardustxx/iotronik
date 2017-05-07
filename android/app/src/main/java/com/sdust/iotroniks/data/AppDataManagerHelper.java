package com.sdust.iotroniks.data;

import android.content.Context;
import android.support.annotation.NonNull;

import com.sdust.iotroniks.data.prefs.AppPreferenceHelper;

import java.util.ArrayList;

public class AppDataManagerHelper implements DataManagerHelper {

  private AppPreferenceHelper appPreferenceHelper;

  public AppDataManagerHelper(Context context) {
    this.appPreferenceHelper = new AppPreferenceHelper(context);
  }

  @Override
  public void getIncidents(@NonNull LoadIncidentsCallback loadIncidentsCallback) {
    ArrayList<Incident> incidents = new ArrayList<>();
    loadIncidentsCallback.onIncidentsLoaded(incidents);
  }

  public void setCurrentEmail(String email) {
    appPreferenceHelper.setCurrentUserEmail(email);
  }

  public String getCurrentEmail() {
    return appPreferenceHelper.getCurrentUserEmail();
  }
}
