package com.sdust.iotroniks.ui.main

import com.sdust.iotroniks.data.AppDataManagerHelper
import com.sdust.iotroniks.data.DataManagerHelper
import com.sdust.iotroniks.data.Incident

internal class MainPresenter(private val appDataManagerHelper: AppDataManagerHelper, private val mainView: MainContract.View) : MainContract.Presenter {

  init {
    this.mainView.setPresenter(this)
  }

  override fun start() {
    mainView.showNoIncidents()
    loadIncidents()
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

  companion object {

    private val TAG = "MainPresenter"
  }
}
