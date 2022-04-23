"
-----------------------------------------------
Find Required Index and Collpases List Columns
-----------------------------------------------
"
applyCollapse <- function(x, lookFor = "", repValue = ""){
        listCols <- getListCols(x)
        lookFor = rep(lookFor, length.out = length(listCols))
        repValue = rep(repValue, length.out = length(listCols))
        x[,listCols] <- lapply(listCols, function(y){
                repMissing(
                        collapseCol(x[[y]]),
                        lookFor = lookFor[match(y,listCols)],
                        repValue = repValue[match(y,listCols)]
                        #Up to this point, repValue and lookFor can be a vector of non negative integers
                )
        })
        return(x)
}

cleanTable <- function (x, dropCol = 0, lookFor = "",repValue = ""){
        "
        ------------------------------------
        Remove Unrequired Columns
        ------------------------------------
        "
        x <- x %>% select(-dropCol)
        
        "
        ------------------------------------
        Collapse List Columns Into Strings
        ------------------------------------
        "
        x <- x %>% applyCollapse(lookFor, repValue)
        
        return(x)
}

"
------------------------------------
Collapse List Into Strings
------------------------------------
"
collapseCol <- function(x, sep = "~", sepDf = " "){
        x <- unlist(
                map(
                        x,
                        ~if(class(.x) == "data.frame"){
                                paste(getChrVector(.x, sepDf), collapse = sep)
                        } else {
                                paste(.x, collapse = sep)
                        }
                )
        )
        return(x)
}

"
----------------------------------------------------------
Marge Given Columns of a Data Frame into Character Vector 
----------------------------------------------------------
"
getChrVector <- function(x, sep = " "){
        x <- sapply(1:nrow(x), 
                    function(row){paste(unlist(x[row,]),collapse = sep)})
        return(x)
}

"
-----------------------------------------
Get Index of Data Frame and List Columns
-----------------------------------------
"
getListCols <- function(x){
        x <- which(map_chr(x, ~class(.x))=="list")
        return(x)
}

"
-----------------------------------------------------
Replace Empty Entries/Repurposing replace() Function 
-----------------------------------------------------
"
repMissing <- function(x, lookFor = "", repValue = ""){
        x <- replace(
                x,
                which(x == lookFor),
                repValue
        )
        return(x)
}
