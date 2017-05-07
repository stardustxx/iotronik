package com.sdust.iotroniks.ui.base;

import android.support.annotation.StringRes;

/**
 * Base interface that any class that wants to act as a View in the MVP
 * pattern must implement. Generally this interface will be extends by a more specific interface
 * that then usually will be implemented by an Activity or Fragment
 */
public interface BaseView<T> {
  void setPresenter(T presenter);
}
