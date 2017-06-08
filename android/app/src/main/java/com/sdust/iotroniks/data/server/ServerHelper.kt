package com.sdust.iotroniks.data.server

import com.sdust.iotroniks.data.Incident

interface ServerHelper {

  interface LoadIncidentsCallback {
    fun onIncidentsLoaded(incidentList: List<Incident>)
  }

  interface LoadOccurrenceCallback {
    fun onOccurrenceLoaded(incidentList: List<Incident>)
  }

  fun getIncidents(loadIncidentsCallback: LoadIncidentsCallback)

  fun getOccurrences(loadOccurrenceCallback: LoadOccurrenceCallback)

}
