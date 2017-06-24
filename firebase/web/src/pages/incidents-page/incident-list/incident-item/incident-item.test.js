import React, { Component } from "react";
import IncidentItem from "./incident-item";
import renderer from "react-test-renderer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Helpers from "../../../../helpers";
import "firebase/storage";

test("Incident item is rendered", () => {
  Helpers.initializeFirebase();
  const component = renderer.create(
    <MuiThemeProvider>
      <IncidentItem date="1497149501713" image="file.jpg_1497149499937" />
    </MuiThemeProvider>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
