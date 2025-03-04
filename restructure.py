#!/usr/bin/env python3

import os
import shutil
import yaml

# Base directories
SOURCE_DIR = "reference/Integration App API"
TARGET_DIR = "reference/Integration App API/restructured"

# Structure definition based on the _order.yaml
structure = {
    "overview": {},
    "Apps": {
        "Integrations": {
            "List integrations": {"ref": "integrationscontroller_listintegrations"},
            "Create integration": {"ref": "integrationscontroller_createintegration"},
            "Get integration by id": {"ref": "integrationscontroller_getintegration"},
            "Patch integration": {"ref": "integrationscontroller_patchintegration"},
            "Update integration": {"ref": "integrationscontroller_putintegration"},
            "Setup integration": {"ref": "integrationscontroller_setupintegration"},
            "Archive integration": {"ref": "integrationscontroller_archiveintegration"},
            "IntegrationConnector": {
                "Get connector parameters": {"ref": "integrationscontroller_getintegrationparameters"},
                "Upload connector": {"ref": "integrationscontroller_uploadconnector"}
            },
            "Global Webhooks": {
                "List integration global webhooks": {"ref": "integrationscontroller_getintegrationglobalwebhooks"}
            }
        },
        "Connections": {
            "List connections": {"ref": "connectionscontroller_listconnections"},
            "Create connection": {"ref": "connectionscontroller_createconnection"},
            "Get connection": {"ref": "connectionscontroller_getconnection"},
            "Get connection logs": {"ref": "connectionscontroller_getlogs"},
            "Update connection": {"ref": "connectionscontroller_patchconnection"},
            "Test connection": {"ref": "connectionscontroller_testconnection"},
            "Refresh connection credentials": {"ref": "connectionscontroller_refreshconnectioncredentials"},
            "Archive connection": {"ref": "connectionscontroller_archiveconnection"}
        }
    },
    "Integration Builder": {
        "Scenarios": {
            "List scenarios": {"ref": "scenarioscontroller_list"},
            "Create scenario": {"ref": "scenarioscontroller_create"},
            "Get scenario": {"ref": "scenariobyidcontroller_get"},
            "Patch scenario": {"ref": "scenariobyidcontroller_patch"},
            "Put scenario": {"ref": "scenariobyidcontroller_put"},
            "Export scenario": {"ref": "scenariobyidcontroller_export"},
            "Archive scenario": {"ref": "scenariobyidcontroller_archive"}
        },
        "Actions": {
            "Universal Actions": {
                "List actions": {"ref": "actionscontroller_listactions"},
                "Create action": {"ref": "actionscontroller_createaction"},
                "Get action by id": {"ref": "actionbyidcontroller_get"},
                "Export action": {"ref": "actionbyidcontroller_export"},
                "Patch action by id": {"ref": "actionbyidcontroller_patch"},
                "Update action by id": {"ref": "actionbyidcontroller_put"},
                "Clone action": {"ref": "actionbyidcontroller_clone"},
                "Apply action to integrations": {"ref": "actionbyidcontroller_apply"},
                "Reset action by id": {"ref": "actionbyidcontroller_reset"},
                "Delete action by id": {"ref": "actionbyidcontroller_archive"}
            },
            "Integration-level Actions": {
                "List actions": {"ref": "integrationlevelactionscontroller_list"},
                "Create action": {"ref": "integrationlevelactionscontroller_create"},
                "Get action by id": {"ref": "integrationlevelactioncontroller_get"},
                "Export action": {"ref": "integrationlevelactioncontroller_export"},
                "Patch action": {"ref": "integrationlevelactioncontroller_patch"},
                "Put action": {"ref": "integrationlevelactioncontroller_put"},
                "Reset action": {"ref": "integrationlevelactioncontroller_reset"},
                "Archive action": {"ref": "integrationlevelactioncontroller_archive"}
            },
            "Connection-level Actions": {
                "List action instances": {"ref": "connectionlevelactionscontroller_list"},
                "Get action instance": {"ref": "connectionlevelactioncontroller_get"},
                "Patch update action instance": {"ref": "connectionlevelactioncontroller_patch"},
                "Create or Replace action instance": {"ref": "connectionlevelactioncontroller_put"},
                "Setup action instance": {"ref": "connectionlevelactioncontroller_setup"},
                "Run action instance": {"ref": "connectionlevelactioncontroller_run"},
                "Reset action instance": {"ref": "connectionlevelactioncontroller_reset"},
                "Archive action instance": {"ref": "connectionlevelactioncontroller_archive"}
            },
            "Action Instances": {
                "List action instances": {"ref": "actioninstancescontroller_listactioninstances"},
                "Get action instance": {"ref": "actioninstancebyidcontroller_getactioninstance"},
                "Patch update action instance": {"ref": "actioninstancebyidcontroller_patchactioninstance"},
                "Replace action instance": {"ref": "actioninstancebyidcontroller_putactioninstance"},
                "Setup action instance": {"ref": "actioninstancebyidcontroller_setup"},
                "Reset action instance": {"ref": "actioninstancebyidcontroller_resetactioninstance"},
                "Archive action instance": {"ref": "actioninstancebyidcontroller_deleteactioninstance"},
                "Run action instance": {"ref": "actioninstancebyidcontroller_runactioninstance"}
            }
        },
        "External Events": {
            "External Event Subscriptions": {
                "List external event subscriptions": {"ref": "externaleventsubscriptionscontroller_listexternaleventsubscriptions"},
                "Get external event subscription": {"ref": "externaleventsubscriptionscontroller_getexternaleventsubscription"},
                "Setup external event subscription": {"ref": "externaleventsubscriptionscontroller_setupexternaleventsubscription"},
                "Subscribe to external event subscription": {"ref": "externaleventsubscriptionscontroller_subscribetoexternaleventsubscription"},
                "Resubscribe to external event subscription": {"ref": "externaleventsubscriptionscontroller_resubscribetoexternaleventsubscription"},
                "Triggers pull events for external event subscription": {"ref": "externaleventsubscriptionscontroller_pullexternaleventsubscriptionevents"},
                "Unsubscribe from external event subscription": {"ref": "externaleventsubscriptionscontroller_unsubscribefromexternaleventsubscription"},
                "Delete external event subscription": {"ref": "externaleventsubscriptionscontroller_deleteexternaleventsubscription"}
            }
        },
        "Proxy API": {"ref": "proxy-api"},
        "Files": {
            "Upload file": {"ref": "filescontroller_upload"}
        }
    },
    "Customers": {
        "List customers": {"ref": "customerscontroller_listcustomers"},
        "Create customer": {"ref": "customerscontroller_createcustomer"},
        "Get customer": {"ref": "customerscontroller_getcustomer"},
        "Patch customer": {"ref": "customerscontroller_patchcustomer"},
        "Update customer": {"ref": "customerscontroller_putcustomer"},
        "Delete customer": {"ref": "customerscontroller_deletecustomer"}
    },
    "Activity Log": {
        "Flow Runs": {
            "List flow runs": {"ref": "flowrunscontroller_listflowruns"},
            "Start flow run": {"ref": "runflowcontroller_runflow"},
            "Stop flow run": {"ref": "flowrunscontroller_stopflowrun"},
            "Get flow run": {"ref": "flowrunscontroller_getflowrun"},
            "Get flow run output": {"ref": "flowrunscontroller_getflowrunoutput"},
            "Node Runs": {
                "Get node run": {"ref": "flowrunscontroller_getflownoderun"},
                "Get node runs": {"ref": "flowrunscontroller_listflownoderuns"},
                "Get node run output": {"ref": "flowrunscontroller_getnoderunoutput"},
                "Get node run outputs": {"ref": "flowrunscontroller_listnoderunoutputs"},
                "Get flow run output for specific node": {"ref": "flowrunscontroller_getflowrunoutputfornode"}
            }
        },
        "External Event Logs": {
            "List external event log records": {"ref": "externaleventlogrecordscontroller_listexternaleventlogrecords"},
            "Get external event log record": {"ref": "externaleventlogrecordscontroller_getexternaleventlogrecord"}
        },
        "App Event Logs": {
            "List app event logs": {"ref": "appeventscontroller_listappevents"},
            "Get app event log": {"ref": "appeventscontroller_getappevent"}
        },
        "External Event Pulls": {
            "List external event pulls": {"ref": "externaleventpullscontroller_list"},
            "Get external event pull": {"ref": "externaleventpullscontroller_getbyid"},
            "Get external event pull logs": {"ref": "externaleventpullscontroller_getlogs"}
        },
        "Incoming Webhooks": {
            "List incoming webhooks": {"ref": "incomingwebhooksreadercontroller_listincomingwebhooks"},
            "Get incoming webhook": {"ref": "incomingwebhooksreadercontroller_getincomingwebhook"},
            "Get incoming webhook details": {"ref": "incomingwebhooksreadercontroller_getincomingwebhookdetails"}
        },
        "External API Logs": {
            "List external API logs": {"ref": "externalapilogscontroller_listlogs"},
            "Get external API log": {"ref": "externalapilogscontroller_getlog"},
            "Get external API log details": {"ref": "externalapilogscontroller_getlogcontent"}
        }
    }
}

# File mapping - maps ref values to source file paths
file_mapping = {}

# Create directory structure and _order.yaml files
def create_structure(structure, current_path=""):
    for key, value in structure.items():
        path = os.path.join(TARGET_DIR, current_path, key)
        os.makedirs(path, exist_ok=True)
        
        # Create _order.yaml for this directory
        order_items = []
        for item_key, item_value in value.items():
            if isinstance(item_value, dict) and "ref" in item_value:
                order_items.append({item_key: {"ref": item_value["ref"]}})
            else:
                order_items.append(item_key)
        
        if order_items:
            with open(os.path.join(path, "_order.yaml"), "w") as f:
                yaml.dump(order_items, f, default_flow_style=False)
        
        # Process subdirectories
        for item_key, item_value in value.items():
            if isinstance(item_value, dict) and "ref" not in item_value:
                create_structure(item_value, os.path.join(current_path, key))

# Copy files based on the structure
def copy_files(structure, current_path=""):
    for key, value in structure.items():
        path = os.path.join(TARGET_DIR, current_path, key)
        
        if isinstance(value, dict):
            if "ref" in value:
                ref = value["ref"]
                if ref == "proxy-api":
                    # Special case for proxy-api.md
                    source_file = os.path.join(SOURCE_DIR, "proxy-api.md")
                    if os.path.exists(source_file):
                        shutil.copy(source_file, path)
                else:
                    # Find the file in the source directory
                    for root, dirs, files in os.walk(SOURCE_DIR):
                        for file in files:
                            if file.endswith(".md") and ref in file:
                                source_file = os.path.join(root, file)
                                target_file = os.path.join(path, file)
                                shutil.copy(source_file, target_file)
                                break
            else:
                # Process subdirectories
                for item_key, item_value in value.items():
                    copy_files({item_key: item_value}, os.path.join(current_path, key))

# Copy overview.md to the overview directory
def copy_overview():
    source_file = os.path.join(SOURCE_DIR, "overview.md")
    target_file = os.path.join(TARGET_DIR, "overview", "overview.md")
    if os.path.exists(source_file):
        shutil.copy(source_file, target_file)

# Main execution
if __name__ == "__main__":
    # Create the target directory
    os.makedirs(TARGET_DIR, exist_ok=True)
    
    # Create the structure and _order.yaml files
    create_structure(structure)
    
    # Copy files
    copy_files(structure)
    
    # Copy overview.md
    copy_overview()
    
    # Create main _order.yaml
    main_order = list(structure.keys())
    with open(os.path.join(TARGET_DIR, "_order.yaml"), "w") as f:
        yaml.dump(main_order, f, default_flow_style=False)
    
    print("Restructuring complete. Files are now organized in", TARGET_DIR) 