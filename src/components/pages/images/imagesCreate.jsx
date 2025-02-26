// MediaCreate.js
import React from "react";
import {
  Create,
  SimpleForm,
  FileInput,
  FileField,
  TextInput,
} from "react-admin";
import MediaPickerInput from "../../elements/mediaPicker/MediaPickerInput";

export const MediaCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <FileInput source="file" label="Upload" accept="image/*">
        <FileField source="src" title="title" />
      </FileInput>
      
    </SimpleForm>
  </Create>
);
