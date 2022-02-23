"
======================================================================
Loading Libraries Individually so They can be Recognized by ShinyApps 
======================================================================
"
library(tidyverse)
library(magrittr)
library(jsonlite)
library(feather)
library(shiny)
library(shinyjs)
library(shinyWidgets)


"
============================================================
Loading Required Data
============================================================
"
data <- read_rds("data/data.rds")
