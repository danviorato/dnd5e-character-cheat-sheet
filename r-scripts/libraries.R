check.packages <- function(pkg){
        new.pkg <- pkg[!(pkg %in% installed.packages()[, "Package"])]
        if (length(new.pkg)) 
                install.packages(new.pkg, dependencies = TRUE)
        sapply(pkg, require, character.only = TRUE)
}

# Usage example
packages<-c("tidyverse", "shiny", "leaflet", 
            "shinyWidgets","shinyjs","magrittr", 
            "jsonlite", "Rcrawler", "rvest",
            "feather")

check.packages(packages)

rm(list = c("check.packages","packages"))
