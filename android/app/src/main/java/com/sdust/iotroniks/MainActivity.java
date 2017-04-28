package com.sdust.iotroniks;

import android.os.Bundle;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;

public class MainActivity extends BaseActivity {

  private RecyclerView listIncident;
  private IncidentRecyclerViewAdapter incidentRecyclerViewAdapter;
  private ArrayList<Incident> incidentList;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    incidentList = new ArrayList<>();

    // Setting the list for showing incidents
    listIncident = (RecyclerView) findViewById(R.id.main_list_incident);
    incidentRecyclerViewAdapter = new IncidentRecyclerViewAdapter(this, incidentList);
    listIncident.setLayoutManager(new LinearLayoutManager(this));
    listIncident.setAdapter(incidentRecyclerViewAdapter);
    listIncident.setItemAnimator(new DefaultItemAnimator());
  }
}
