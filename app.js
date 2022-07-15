require('dotenv').config()
const express = require('express')
const hubspot = require('@hubspot/api-client')
const bp = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port = process.env.PORT
const apiKey = process.env.HUBSPOT_API_KEY
const tableName = process.env.TABLE_NAME

const hubspotClient = new hubspot.Client({"apiKey":apiKey})

//get table information
app.get(`/`, async(req, res) => {

    try {
        const apiResponse = await hubspotClient.cms.hubdb.tablesApi.getTableDetails(tableName)
        res.send(JSON.stringify(apiResponse, null, 2))    

      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }   
})

//get rows from published
app.get(`/rows`, async(req, res) => {

    try {
        const apiResponse = await hubspotClient.cms.hubdb.rowsApi.getTableRows(tableName)
        res.send(JSON.stringify(apiResponse.results, null, 2))   

      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }   
})

//get rows from draft
app.get(`/rows/draft`, async(req, res) => {

    try {
        const apiResponse = await hubspotClient.cms.hubdb.rowsApi.readDraftTableRows(tableName)
        res.send(JSON.stringify(apiResponse.results, null, 2))  

      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }   
})

//adds new row to draft
app.post(`/rows/draft`, async(req, res) => {

    try {
        const body = req.body;

        const values = {
            "name": body.name,
            "last_name": body.last_name,
            "document_id": body.document_id
        }

        const HubDbTableRowV3Request = {path:null,name:null, childTableId:0,values}
        const apiResponse = await hubspotClient.cms.hubdb.rowsApi.createTableRow(tableName, HubDbTableRowV3Request)

        console.log("Row added successfully")
        
        res.end()
        
      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }   
})

//updates new row to draft
app.put(`/rows/draft/:id`, async(req, res) => {

    const { id } = req.params;

    try {
        const body = req.body;

        const values = {
            "name": body.name,
            "last_name": body.last_name,
            "document_id": body.document_id
        }

        const HubDbTableRowV3Request = {path:null,name:null, childTableId:0,values}
        const apiResponse = await hubspotClient.cms.hubdb.rowsApi.updateDraftTableRow(tableName,id,HubDbTableRowV3Request)

        console.log("Row updated successfully")
        
        res.end()
        
      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }   
})

//publish a table from draft
app.put(`/rows`, async(req, res) => {

    try {
        const apiResponse = await hubspotClient.cms.hubdb.tablesApi.publishDraftTable(tableName)

        console.log("Table published successfully")
        
        res.end()
        
      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }   
})

//deletes row on draft
app.delete(`/rows/draft/:id`, async(req, res) => {

    const { id } = req.params;

    try {

        const apiResponse = await hubspotClient.cms.hubdb.rowsApi.purgeDraftTableRow(tableName,id)

        console.log("Row deleted successfully")
        
        res.end()
        
      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }   
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

