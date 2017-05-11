package com.sdust.iotroniks.ui.main;

import android.os.Bundle;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;

import com.sdust.iotroniks.R;
import com.sdust.iotroniks.data.AppDataManagerHelper;
import com.sdust.iotroniks.data.Incident;
import com.sdust.iotroniks.ui.base.BaseActivity;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;

public class MainActivity extends BaseActivity implements MainContract.View {

  private static final String TAG = "MainActivity";

  private MainContract.Presenter mainPresenter;

  private IncidentRecyclerViewAdapter incidentRecyclerViewAdapter;
  private ArrayList<Incident> incidentList;

  @BindView(R.id.main_list_incident)
  RecyclerView listIncident;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    mainPresenter = new MainPresenter(new AppDataManagerHelper(getApplicationContext()), this);
    incidentList = new ArrayList<>();

    // Setting the list for showing incidents
    incidentRecyclerViewAdapter = new IncidentRecyclerViewAdapter(this, incidentList);
    listIncident.setLayoutManager(new LinearLayoutManager(this));
    listIncident.setAdapter(incidentRecyclerViewAdapter);
    listIncident.setItemAnimator(new DefaultItemAnimator());
  }

  @Override
  protected void onResume() {
    super.onResume();
    mainPresenter.start();
  }

  @Override
  public boolean isActive() {
    return false;
  }

  @Override
  public void showNoIncidents() {
    Log.d(TAG, "show no incidents");
  }

  @Override
  public void showAddTasks(List<Incident> incidents) {

  }

  @Override
  public void setPresenter(MainContract.Presenter presenter) {
//    this.mainPresenter = presenter;
  }

  @Override
  public void showIncidents(List<Incident> incidents) {
    Log.d(TAG, "show incidents");
  }
}
