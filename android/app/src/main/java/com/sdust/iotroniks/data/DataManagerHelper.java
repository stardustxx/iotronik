package com.sdust.iotroniks.data;

import android.support.annotation.NonNull;

import java.util.List;

public interface DataManagerHelper {

  interface LoadIncidentsCallback {
    void onIncidentsLoaded(List<Incident> incidents);
  }

  void getIncidents(@NonNull LoadIncidentsCallback loadIncidentsCallback);

}
