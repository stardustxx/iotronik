package com.sdust.iotroniks;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

class IncidentRecyclerViewAdapter extends RecyclerView.Adapter<IncidentRecyclerViewAdapter.IncidentViewHolder> {

  private Context context;
  private ArrayList<Incident> incidentList;

  IncidentRecyclerViewAdapter(Context context, ArrayList<Incident> incidentList) {
    this.context = context;
    this.incidentList = incidentList;
  }

  @Override
  public IncidentViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
    View view = LayoutInflater.from(context).inflate(R.layout.item_incident, parent, false);
    return new IncidentViewHolder(view);
  }

  @Override
  public void onBindViewHolder(IncidentViewHolder holder, int position) {
    Incident incident = incidentList.get(position);
    holder.setTextDate(incident.getTimeLong());
    holder.setTextIncidentTitle(incident.getTitle());
  }

  @Override
  public int getItemCount() {
    return incidentList.size();
  }

  class IncidentViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

    private TextView textDate;
    private TextView textIncidentTitle;

    IncidentViewHolder(View itemView) {
      super(itemView);
      textDate = (TextView) itemView.findViewById(R.id.item_incident_date);
      textIncidentTitle = (TextView) itemView.findViewById(R.id.item_incident_title);
      itemView.setOnClickListener(this);
    }

    private void setTextDate(long incidentDate) {
      Date date = new Date(incidentDate);
      SimpleDateFormat simpleDateFormat = new SimpleDateFormat(context.getResources().getString(R.string.incident_time_pattern), Locale.getDefault());
      textDate.setText(simpleDateFormat.format(date));
    }

    private void setTextIncidentTitle(String title) {
      textIncidentTitle.setText(title);
    }

    @Override
    public void onClick(View view) {
      Log.d("Item", "Incident item clicked");
    }
  }
}
