import React, { Component } from "react";
import {Header} from './Header'
import {
    Typography,
    Dialog,
    DialogContent,
  } from "@material-ui/core";
import Loader from "react-loader-spinner";

export const  Spinner =(props)=> {
    const {showSpinner} = props
        return (
            <Dialog open={showSpinner}>
            <DialogContent>
            <div className="text-center">
                <Loader
                  type="Grid"
                  color="#ec6628"
                  height="15%"
                  width="15%"
                />
                <div className="mt-3">
                 
                    <Typography>please wait</Typography>
                  
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )
    }