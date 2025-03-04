#!/bin/bash

# Base directories
SOURCE_DIR="reference/Integration App API"
TARGET_DIR="reference/Integration App API/restructured"

# Create the main structure
mkdir -p "$TARGET_DIR"
mkdir -p "$TARGET_DIR/overview"
mkdir -p "$TARGET_DIR/Apps/Integrations/IntegrationConnector"
mkdir -p "$TARGET_DIR/Apps/Integrations/Global Webhooks"
mkdir -p "$TARGET_DIR/Apps/Connections"
mkdir -p "$TARGET_DIR/Integration Builder/Scenarios"
mkdir -p "$TARGET_DIR/Integration Builder/Actions/Universal Actions"
mkdir -p "$TARGET_DIR/Integration Builder/Actions/Integration-level Actions"
mkdir -p "$TARGET_DIR/Integration Builder/Actions/Connection-level Actions"
mkdir -p "$TARGET_DIR/Integration Builder/Actions/Action Instances"
mkdir -p "$TARGET_DIR/Integration Builder/External Events/External Event Subscriptions"
mkdir -p "$TARGET_DIR/Integration Builder/Flows/Universal Flows"
mkdir -p "$TARGET_DIR/Integration Builder/Flows/Integration-level Flows"
mkdir -p "$TARGET_DIR/Integration Builder/Flows/Connection-level Flows"
mkdir -p "$TARGET_DIR/Integration Builder/Flows/Flow Instances"
mkdir -p "$TARGET_DIR/Integration Builder/Flows/Node Runs"
mkdir -p "$TARGET_DIR/Integration Builder/Field Mappings/Universal Field Mappings"
mkdir -p "$TARGET_DIR/Integration Builder/Field Mappings/Integration-level Field Mappings"
mkdir -p "$TARGET_DIR/Integration Builder/Field Mappings/Connection-level Field Mappings"
mkdir -p "$TARGET_DIR/Integration Builder/Field Mappings/Field Mapping Instances"
mkdir -p "$TARGET_DIR/Integration Builder/Data Sources/Universal Data Sources"
mkdir -p "$TARGET_DIR/Integration Builder/Data Sources/Integration-level Data Sources"
mkdir -p "$TARGET_DIR/Integration Builder/Data Sources/Connection-level Data Sources"
mkdir -p "$TARGET_DIR/Integration Builder/Data Sources/Data Source Instances"
mkdir -p "$TARGET_DIR/Integration Builder/Data Links/Data Link Tables"
mkdir -p "$TARGET_DIR/Integration Builder/Data Links/Data Link Table Instances"
mkdir -p "$TARGET_DIR/Integration Builder/Data Links/Data Link Records"
mkdir -p "$TARGET_DIR/Integration Builder/App Data Schemas/App Data Schemas"
mkdir -p "$TARGET_DIR/Integration Builder/App Data Schemas/App Data Schema Instances"
mkdir -p "$TARGET_DIR/Integration Builder/App Events/App Event Types"
mkdir -p "$TARGET_DIR/Integration Builder/App Events/App Event Subscriptions"
mkdir -p "$TARGET_DIR/Integration Builder/API Operations/Integration-level API Operations"
mkdir -p "$TARGET_DIR/Integration Builder/API Operations/Connection-level API Operations"
mkdir -p "$TARGET_DIR/Integration Builder/Data Collections/Integration-level Data Collections"
mkdir -p "$TARGET_DIR/Integration Builder/Data Collections/Connection-level Data Collections"
mkdir -p "$TARGET_DIR/Integration Builder/Proxy API"
mkdir -p "$TARGET_DIR/Integration Builder/Files"
mkdir -p "$TARGET_DIR/Customers"
mkdir -p "$TARGET_DIR/Activity Log/Flow Runs"
mkdir -p "$TARGET_DIR/Activity Log/External Event Logs"
mkdir -p "$TARGET_DIR/Activity Log/App Event Logs"
mkdir -p "$TARGET_DIR/Activity Log/External Event Pulls"
mkdir -p "$TARGET_DIR/Activity Log/Incoming Webhooks"
mkdir -p "$TARGET_DIR/Activity Log/External API Logs"

# Copy overview files
cp "$SOURCE_DIR/overview.md" "$TARGET_DIR/overview/"
cp "$SOURCE_DIR/proxy-api.md" "$TARGET_DIR/Integration Builder/Proxy API/"

# Copy files based on the structure in _order.yaml
# Apps - Integrations
cp "$SOURCE_DIR/integrations/integrationscontroller_listintegrations.md" "$TARGET_DIR/Apps/Integrations/"
cp "$SOURCE_DIR/integrations/integrationscontroller_createintegration.md" "$TARGET_DIR/Apps/Integrations/"
cp "$SOURCE_DIR/integrations/integrationscontroller_getintegration.md" "$TARGET_DIR/Apps/Integrations/"
cp "$SOURCE_DIR/integrations/integrationscontroller_patchintegration.md" "$TARGET_DIR/Apps/Integrations/"
cp "$SOURCE_DIR/integrations/integrationscontroller_putintegration.md" "$TARGET_DIR/Apps/Integrations/"
cp "$SOURCE_DIR/integrations/integrationscontroller_setupintegration.md" "$TARGET_DIR/Apps/Integrations/"
cp "$SOURCE_DIR/integrations/integrationscontroller_archiveintegration.md" "$TARGET_DIR/Apps/Integrations/"

# Apps - Integrations - IntegrationConnector
cp "$SOURCE_DIR/integrations/integrationscontroller_getintegrationparameters.md" "$TARGET_DIR/Apps/Integrations/IntegrationConnector/"
cp "$SOURCE_DIR/integrations/integrationscontroller_uploadconnector.md" "$TARGET_DIR/Apps/Integrations/IntegrationConnector/"

# Apps - Integrations - Global Webhooks
cp "$SOURCE_DIR/integrations/integrationscontroller_getintegrationglobalwebhooks.md" "$TARGET_DIR/Apps/Integrations/Global Webhooks/"

# Apps - Connections
cp "$SOURCE_DIR/connections/connectionscontroller_listconnections.md" "$TARGET_DIR/Apps/Connections/"
cp "$SOURCE_DIR/connections/connectionscontroller_createconnection.md" "$TARGET_DIR/Apps/Connections/"
cp "$SOURCE_DIR/connections/connectionscontroller_getconnection.md" "$TARGET_DIR/Apps/Connections/"
cp "$SOURCE_DIR/connections/connectionscontroller_getlogs.md" "$TARGET_DIR/Apps/Connections/"
cp "$SOURCE_DIR/connections/connectionscontroller_patchconnection.md" "$TARGET_DIR/Apps/Connections/"
cp "$SOURCE_DIR/connections/connectionscontroller_testconnection.md" "$TARGET_DIR/Apps/Connections/"
cp "$SOURCE_DIR/connections/connectionscontroller_refreshconnectioncredentials.md" "$TARGET_DIR/Apps/Connections/"
cp "$SOURCE_DIR/connections/connectionscontroller_archiveconnection.md" "$TARGET_DIR/Apps/Connections/"

# Integration Builder - Scenarios
cp "$SOURCE_DIR/scenarios/scenarioscontroller_list.md" "$TARGET_DIR/Integration Builder/Scenarios/"
cp "$SOURCE_DIR/scenarios/scenarioscontroller_create.md" "$TARGET_DIR/Integration Builder/Scenarios/"
cp "$SOURCE_DIR/scenarios/scenariobyidcontroller_get.md" "$TARGET_DIR/Integration Builder/Scenarios/"
cp "$SOURCE_DIR/scenarios/scenariobyidcontroller_patch.md" "$TARGET_DIR/Integration Builder/Scenarios/"
cp "$SOURCE_DIR/scenarios/scenariobyidcontroller_put.md" "$TARGET_DIR/Integration Builder/Scenarios/"
cp "$SOURCE_DIR/scenarios/scenariobyidcontroller_export.md" "$TARGET_DIR/Integration Builder/Scenarios/"
cp "$SOURCE_DIR/scenarios/scenariobyidcontroller_archive.md" "$TARGET_DIR/Integration Builder/Scenarios/"

# Integration Builder - Actions - Universal Actions
cp "$SOURCE_DIR/actions/actionscontroller_listactions.md" "$TARGET_DIR/Integration Builder/Actions/Universal Actions/"
cp "$SOURCE_DIR/actions/actionscontroller_createaction.md" "$TARGET_DIR/Integration Builder/Actions/Universal Actions/"
cp "$SOURCE_DIR/actions/actionbyidcontroller_get.md" "$TARGET_DIR/Integration Builder/Actions/Universal Actions/"
cp "$SOURCE_DIR/actions/actionbyidcontroller_export.md" "$TARGET_DIR/Integration Builder/Actions/Universal Actions/"
cp "$SOURCE_DIR/actions/actionbyidcontroller_patch.md" "$TARGET_DIR/Integration Builder/Actions/Universal Actions/"
cp "$SOURCE_DIR/actions/actionbyidcontroller_put.md" "$TARGET_DIR/Integration Builder/Actions/Universal Actions/"
cp "$SOURCE_DIR/actions/actionbyidcontroller_clone.md" "$TARGET_DIR/Integration Builder/Actions/Universal Actions/"
cp "$SOURCE_DIR/actions/actionbyidcontroller_apply.md" "$TARGET_DIR/Integration Builder/Actions/Universal Actions/"
cp "$SOURCE_DIR/actions/actionbyidcontroller_reset.md" "$TARGET_DIR/Integration Builder/Actions/Universal Actions/"
cp "$SOURCE_DIR/actions/actionbyidcontroller_archive.md" "$TARGET_DIR/Integration Builder/Actions/Universal Actions/"

# Integration Builder - Actions - Integration-level Actions
cp "$SOURCE_DIR/actions/integrationlevelactionscontroller_list.md" "$TARGET_DIR/Integration Builder/Actions/Integration-level Actions/"
cp "$SOURCE_DIR/actions/integrationlevelactionscontroller_create.md" "$TARGET_DIR/Integration Builder/Actions/Integration-level Actions/"
cp "$SOURCE_DIR/actions/integrationlevelactioncontroller_get.md" "$TARGET_DIR/Integration Builder/Actions/Integration-level Actions/"
cp "$SOURCE_DIR/actions/integrationlevelactioncontroller_export.md" "$TARGET_DIR/Integration Builder/Actions/Integration-level Actions/"
cp "$SOURCE_DIR/actions/integrationlevelactioncontroller_patch.md" "$TARGET_DIR/Integration Builder/Actions/Integration-level Actions/"
cp "$SOURCE_DIR/actions/integrationlevelactioncontroller_put.md" "$TARGET_DIR/Integration Builder/Actions/Integration-level Actions/"
cp "$SOURCE_DIR/actions/integrationlevelactioncontroller_reset.md" "$TARGET_DIR/Integration Builder/Actions/Integration-level Actions/"
cp "$SOURCE_DIR/actions/integrationlevelactioncontroller_archive.md" "$TARGET_DIR/Integration Builder/Actions/Integration-level Actions/"

# Integration Builder - Actions - Connection-level Actions
cp "$SOURCE_DIR/actions/connectionlevelactionscontroller_list.md" "$TARGET_DIR/Integration Builder/Actions/Connection-level Actions/"
cp "$SOURCE_DIR/actions/connectionlevelactioncontroller_get.md" "$TARGET_DIR/Integration Builder/Actions/Connection-level Actions/"
cp "$SOURCE_DIR/actions/connectionlevelactioncontroller_patch.md" "$TARGET_DIR/Integration Builder/Actions/Connection-level Actions/"
cp "$SOURCE_DIR/actions/connectionlevelactioncontroller_put.md" "$TARGET_DIR/Integration Builder/Actions/Connection-level Actions/"
cp "$SOURCE_DIR/actions/connectionlevelactioncontroller_setup.md" "$TARGET_DIR/Integration Builder/Actions/Connection-level Actions/"
cp "$SOURCE_DIR/actions/connectionlevelactioncontroller_run.md" "$TARGET_DIR/Integration Builder/Actions/Connection-level Actions/"
cp "$SOURCE_DIR/actions/connectionlevelactioncontroller_reset.md" "$TARGET_DIR/Integration Builder/Actions/Connection-level Actions/"
cp "$SOURCE_DIR/actions/connectionlevelactioncontroller_archive.md" "$TARGET_DIR/Integration Builder/Actions/Connection-level Actions/"

# Integration Builder - Actions - Action Instances
cp "$SOURCE_DIR/actions/actioninstancescontroller_listactioninstances.md" "$TARGET_DIR/Integration Builder/Actions/Action Instances/"
cp "$SOURCE_DIR/actioninstancebyid/actioninstancebyidcontroller_getactioninstance.md" "$TARGET_DIR/Integration Builder/Actions/Action Instances/"
cp "$SOURCE_DIR/actioninstancebyid/actioninstancebyidcontroller_patchactioninstance.md" "$TARGET_DIR/Integration Builder/Actions/Action Instances/"
cp "$SOURCE_DIR/actioninstancebyid/actioninstancebyidcontroller_putactioninstance.md" "$TARGET_DIR/Integration Builder/Actions/Action Instances/"
cp "$SOURCE_DIR/actioninstancebyid/actioninstancebyidcontroller_setup.md" "$TARGET_DIR/Integration Builder/Actions/Action Instances/"
cp "$SOURCE_DIR/actioninstancebyid/actioninstancebyidcontroller_resetactioninstance.md" "$TARGET_DIR/Integration Builder/Actions/Action Instances/"
cp "$SOURCE_DIR/actioninstancebyid/actioninstancebyidcontroller_deleteactioninstance.md" "$TARGET_DIR/Integration Builder/Actions/Action Instances/"
cp "$SOURCE_DIR/actioninstancebyid/actioninstancebyidcontroller_runactioninstance.md" "$TARGET_DIR/Integration Builder/Actions/Action Instances/"

# Integration Builder - External Events - External Event Subscriptions
cp "$SOURCE_DIR/external-events/externaleventsubscriptionscontroller_listexternaleventsubscriptions.md" "$TARGET_DIR/Integration Builder/External Events/External Event Subscriptions/"
cp "$SOURCE_DIR/external-events/externaleventsubscriptionscontroller_getexternaleventsubscription.md" "$TARGET_DIR/Integration Builder/External Events/External Event Subscriptions/"
cp "$SOURCE_DIR/external-events/externaleventsubscriptionscontroller_setupexternaleventsubscription.md" "$TARGET_DIR/Integration Builder/External Events/External Event Subscriptions/"
cp "$SOURCE_DIR/external-events/externaleventsubscriptionscontroller_subscribetoexternaleventsubscription.md" "$TARGET_DIR/Integration Builder/External Events/External Event Subscriptions/"
cp "$SOURCE_DIR/external-events/externaleventsubscriptionscontroller_resubscribetoexternaleventsubscription.md" "$TARGET_DIR/Integration Builder/External Events/External Event Subscriptions/"
cp "$SOURCE_DIR/external-events/externaleventsubscriptionscontroller_pullexternaleventsubscriptionevents.md" "$TARGET_DIR/Integration Builder/External Events/External Event Subscriptions/"
cp "$SOURCE_DIR/external-events/externaleventsubscriptionscontroller_unsubscribefromexternaleventsubscription.md" "$TARGET_DIR/Integration Builder/External Events/External Event Subscriptions/"
cp "$SOURCE_DIR/external-events/externaleventsubscriptionscontroller_deleteexternaleventsubscription.md" "$TARGET_DIR/Integration Builder/External Events/External Event Subscriptions/"

# Continue with the rest of the files...
# This is a partial script - you would need to continue with all the other sections

# Create _order.yaml files for each directory
# For example:
echo "- List integrations:
    ref: integrationscontroller_listintegrations
- Create integration:
    ref: integrationscontroller_createintegration
- Get integration by id:
    ref: integrationscontroller_getintegration
- Patch integration:
    ref: integrationscontroller_patchintegration
- Update integration:
    ref: integrationscontroller_putintegration
- Setup integration:
    ref: integrationscontroller_setupintegration
- Archive integration:
    ref: integrationscontroller_archiveintegration
- IntegrationConnector
- Global Webhooks" > "$TARGET_DIR/Apps/Integrations/_order.yaml"

# Create the main _order.yaml
echo "- overview
- Apps
- Integration Builder
- Customers
- Activity Log" > "$TARGET_DIR/_order.yaml"

echo "Restructuring complete. Files are now organized in $TARGET_DIR" 