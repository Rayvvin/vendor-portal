// MediaPickerModal.js
import React, { useEffect, useState, useRef } from "react";
import { useDataProvider, useGetList } from "react-admin";
import {
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

const MediaPickerModal = ({
  onSelect,
  value,
  selectedImages,
  setSelectedImages,
  inputType,
}) => {
  const dataProvider = useDataProvider();
  const { data: mediaFiles, total, isPending, error, refetch, meta } = useGetList("image", {
    pagination: { page: 1, perPage: 300 },
    sort: { field: "id", order: "DESC" },
    filter: {},
  });

  const toggleSelect = (imageUrl) => {
    if (inputType == "single") {
      setSelectedImages([imageUrl]);
    } else {
      setSelectedImages((prevState) =>
        prevState.includes(imageUrl)
          ? prevState.filter((url) => url !== imageUrl)
          : [...prevState, imageUrl]
      );
    }
  };

  // const handleConfirmSelection = () => {
  //   onSelect(selectedImages);
  // };

  // useEffect(() => {
  //   console.log(mediaFiles)
  // }, [mediaFiles]);

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        {mediaFiles &&
          mediaFiles.length &&
          mediaFiles.map((record) => (
            <Grid item key={record.id} xs={6} sm={4} md={3}>
              <Card>
                <CardActionArea onClick={() => toggleSelect(record.url)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={record.url}
                    alt={record.name}
                    style={{
                      opacity: selectedImages.includes(record.url) ? 0.7 : 1,
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedImages.includes(record.url)}
                        onChange={() => toggleSelect(record.url)}
                        color="primary"
                      />
                    }
                    label=""
                    style={{ position: "absolute", top: 0, right: 0 }}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default MediaPickerModal;
