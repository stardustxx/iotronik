package com.sdust.iotroniks.ui.main;

import com.sdust.iotroniks.data.AppDataManagerHelper;
import com.sdust.iotroniks.data.DataManagerHelper;
import com.sdust.iotroniks.data.Incident;

import java.util.List;

class MainPresenter implements MainContract.Presenter {

  private static final String TAG = "MainPresenter";

  private final MainContract.View mainView;
  private final AppDataManagerHelper appDataManagerHelper;

  MainPresenter(AppDataManagerHelper appDataManagerHelper, MainContract.View mainView) {
    this.mainView = mainView;
    this.mainView.setPresenter(this);
    this.appDataManagerHelper = appDataManagerHelper;
  }

  @Override
  public void start() {
    mainView.showNoIncidents();
    loadIncidents();
  }

  @Override
  public void result(int requestCode, int resultCode) {

  }

  @Override
  public void loadIncidents() {
    appDataManagerHelper.getIncidents(new DataManagerHelper.LoadIncidentsCallback() {
      @Override
      public void onIncidentsLoaded(List<Incident> incidents) {
        mainView.showIncidents(incidents);
      }
    });
  }
}
