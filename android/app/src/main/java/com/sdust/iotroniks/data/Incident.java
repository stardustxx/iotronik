package com.sdust.iotroniks.data;

import com.google.firebase.database.Exclude;
import com.google.firebase.database.ServerValue;

import java.util.Date;
import java.util.Map;

public class Incident {

  private String title;
  private Long time;
  private String image;

  public Incident() {

  }

  public Incident(String title) {
    this.title = title;
  }

  public Incident(String title, Long time) {
    this.title = title;
    this.time = time;
  }

  public Incident(String title, Long time, String image) {
    this.title = title;
    this.time = time;
    this.image = image;
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

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }
}