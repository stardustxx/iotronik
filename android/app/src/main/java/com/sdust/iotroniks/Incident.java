package com.sdust.iotroniks;

import com.google.firebase.database.Exclude;
import com.google.firebase.database.ServerValue;

import java.util.Date;
import java.util.Map;

public class Incident {

  private Date date;
  private String title;
  private Long time;

  public Incident(String title) {
    this.title = title;
  }

  public Incident(String title, Long time) {
    this.title = title;
    this.time = time;
  }

  public Incident(Date date, String title) {
    this.date = date;
    this.title = title;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  @Exclude
  public Long getTimeLong() {
    return time;
  }

  public Map<String, String> getTime() {
    return ServerValue.TIMESTAMP;
  }
}