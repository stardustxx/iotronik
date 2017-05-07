package com.sdust.iotroniks.ui.main;

import com.sdust.iotroniks.data.Incident;
import com.sdust.iotroniks.ui.base.BasePresenter;
import com.sdust.iotroniks.ui.base.BaseView;

import java.util.List;

interface MainContract {

  interface View extends BaseView<Presenter> {

    boolean isActive();

    void showNoIncidents();

    void showIncidents(List<Incident> incidents);

    void showAddTasks(List<Incident> incidents);

  }

  interface Presenter extends BasePresenter {

    void result(int requestCode, int resultCode);

    void loadIncidents();

  }

}
