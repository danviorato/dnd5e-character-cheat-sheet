source("libraries.R")

gitRoot <- "https://github.com"
mainUrl <- "https://github.com/5etools-mirror-1/5etools-mirror-1.github.io//tree/master/data"

"
============================================================
Fetch data
============================================================
"

"
------------------------------
Get URLs of Raw Jsons
------------------------------
"
crawlPaths <- c("/class$","/spells$","spells/spells\\-[a-z\\-]*.json$",
                "/actions.json$","/backgrounds.json","/conditionsdiseases.json",
                "/feats.json","/items.json","/races.json", "/class\\-[a-z\\-]*.json$")
Rcrawler( Website = mainUrl,
          crawlUrlfilter = crawlPaths,
          ExtractXpathPat = "//*/a[@id='raw-url']/@href",
          crawlZoneCSSPat = "div[class='Box mb-3']",
          MaxDepth = 2,
          ManyPerPattern = F)

allLinks <- unlist(lapply(DATA, `[[`, 2))
linksCondition <- str_detect(allLinks,"raw/master/data") &
        !is.na(allLinks) & !str_detect(allLinks,"-ua-") 
rawLinks <- paste0(gitRoot, allLinks[linksCondition]) 

rm(list = c("DATA","INDEX","allLinks","crawlPaths",
            "gitRoot","linksCondition","mainUrl"))

unlink(list.files()[str_detect(list.files(),"github.com\\-")], recursive=T)

"
============================================================
Write Data
============================================================
"
getNameUrl <- function(x){
        str_extract(x, pattern = "(class|data|spells)/[a-zA-Z\\-]*.json") %>% 
                str_remove_all(pattern = "(spells|data|class)/|.json")
}
jsonNames <- getNameUrl(rawLinks)
jsonStrings <- lapply(1:length(rawLinks), function(x){
        read_file(rawLinks[[x]]) %>% str_remove_all(pattern = "\\n|\\t")
})

for (x in 1:length(jsonStrings)) {
        write_json(jsonStrings[[x]],paste0("../json/",jsonNames[x],".json"))
}

write_file(paste(rawLinks, collapse = ";"), "../csv/jsonLinks.txt")
