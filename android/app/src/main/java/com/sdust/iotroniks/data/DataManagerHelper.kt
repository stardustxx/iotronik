package com.sdust.iotroniks.data

interface DataManagerHelper {

  interface LoadIncidentsCallback {
    fun onIncidentsLoaded(incidents: List<Incident>)
  }

  interface LoadOccurrencesCallback {
    fun onOccurrencesLoaded(incidents: List<Incident>)
  }

  fun getIncidents(loadIncidentsCallback: LoadIncidentsCallback)


}
