package com.sdust.iotroniks.data

interface DataManagerHelper {

  interface LoadIncidentsCallback {
    fun onIncidentsLoaded(incidentList: List<Incident>)
  }

  interface LoadOccurrenceCallback {
    fun onOccurrenceLoaded(incidentList: List<Incident>)
  }

  fun getIncidents(loadIncidentsCallback: LoadIncidentsCallback)

  fun getOccurrences(loadOccurrenceCallback: LoadOccurrenceCallback)

  fun setCurrentUserEmail(email: String)

  fun getCurrentUserEmail(): String

}
