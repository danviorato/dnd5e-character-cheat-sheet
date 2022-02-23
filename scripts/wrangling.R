source("scripts/libraries.R")

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
Load and Merge Json files
============================================================
"

"
---------------------------------
Actions
---------------------------------
"

actions <- fromJSON(rawLinks[str_detect(rawLinks,"/actions.json$")])$action%>% 
        as_tibble()

"
---------------------------------
Feats
---------------------------------
"

feats <- fromJSON(rawLinks[str_detect(rawLinks,"/feats.json$")])$feat %>% 
        as_tibble() %>% filter(!str_detect(source,"UA"))

"
---------------------------------
Races
---------------------------------
"

races <- fromJSON(rawLinks[str_detect(rawLinks,"/races.json$")])$race %>% 
        as_tibble() %>% filter(!str_detect(source,"UA"))

"
----------------------------------
Classes
----------------------------------
"
classLinks <- rawLinks[str_detect(rawLinks,"class")]
classTables <- lapply(1:length(classLinks), function(x){
        fromJSON(classLinks[x])$class %>% as_tibble()
})

classes <- bind_rows(classTables[1:length(classTables)]) %>%
        filter(is.na(isReprinted), !str_detect(source, "UA"),
               !str_detect(name, "Sidekick"))

rm("classTables")

"
----------------------------------
Class Features
----------------------------------
"

classFeatTables <- lapply(1:length(classLinks), function(x){
        fromJSON(classLinks[x])$classFeature %>% as_tibble()
})

classFeatures <- bind_rows(classFeatTables[1:length(classFeatTables)]) %>%
        filter(!str_detect(source, "UA"))

rm("classFeatTables")

"
----------------------------------
Subclasses
----------------------------------
"

subclassTables <- lapply(1:length(classLinks), function(x){
        fromJSON(classLinks[x])$subclass %>% as_tibble()
})

subclasses <- bind_rows(subclassTables[1:length(subclassTables)]) %>%
        filter(!str_detect(source, "UA"))

rm("subclassTables")

"
----------------------------------
Subclass Features
----------------------------------
"

subclassFeatTables <- lapply(1:length(classLinks), function(x){
        fromJSON(classLinks[x])$subclassFeature %>% as_tibble()
})

subclassFeatures <- bind_rows(subclassFeatTables[1:length(subclassFeatTables)]) %>%
        filter(!str_detect(source, "UA"))

rm(list = c("classLinks","subclassFeatTables"))

"
---------------------------------
Spells
---------------------------------
"

spellLinks <- rawLinks[str_detect(rawLinks,"spells")]
spellTables <- lapply(1:length(spellLinks), function(x){
        fromJSON(spellLinks[x])$spell %>% as_tibble()
})

spellTables[[2]]$components$m <- as.list(list(spellTables[[2]]$components$m))

spellTables[[6]]$components$m <- as.list(list(spellTables[[6]]$components$m))

spellTables[[3]]$scalingLevelDice <- lapply(
        split(spellTables[[3]]$scalingLevelDice, 
              1:nrow(spellTables[[3]]$scalingLevelDice)), as.list)

spellTables[[8]]$scalingLevelDice <- lapply(
        split(spellTables[[8]]$scalingLevelDice, 
              1:nrow(spellTables[[8]]$scalingLevelDice)), as.list)

spells <- bind_rows(spellTables[1:length(spellTables)])

rm(list = c("spellLinks","spellTables"))

"
============================================================
Write Data
============================================================
"
data <- list(actions, classes, classFeatures, feats,
             races, spells, subclasses, subclassFeatures)

write_feather(actions,"data/data.feather")
write_rds(data,"data/data.rds")
