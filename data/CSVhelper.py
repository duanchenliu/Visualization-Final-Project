import csv
import json
import pandas as pd
#here, place your csv file path
#     your desired output path
csvFilePath = "final/spinComplete.csv"
jsonFilePath = "finalProjectData/ourGTD2.json"
#the fieldNames contains the category you want to get
filedNames = {"year","country","attack_num"}

data = pd.read_csv(csvFilePath)
res = data.loc[:,filedNames]
# print (res)

out = res.to_json( orient ='records').replace('},', '},\n')
with open(jsonFilePath, 'w') as f:
    f.write(out)
