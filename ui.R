source("scripts/load-data.R")

shinyUI(
    fluidPage(
        fluidRow(
            class="hola",
            tags$head(
                tags$link(rel = "stylesheet", type = "text/css", href = "style-behaviour/style.css"),
                tags$link(rel = "stylesheet", type = "text/css", href = "style-behaviour/normalize.css")
            ),
            h1("Hola"),
            downloadButton("prueba", label = "Prueba",class = "hola", icon= NULL),
            downloadButton("prueba", label = "Prueba", icon= NULL)
        ),
        fluidRow(
            h1("Hola"),
            downloadButton("prueba", label = "Prueba",class = "hola", icon= NULL),
            downloadButton("prueba", label = "Prueba", icon= NULL)
            )
    ))
