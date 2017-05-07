package com.sdust.iotroniks.ui.base;

/**
 * Every presenter in the app must either implement this interface or extend from BasePresenter
 * indicating the BaseView type that wants to be attached with.
 */
public interface BasePresenter<V extends BaseView> {

  void start();
}
