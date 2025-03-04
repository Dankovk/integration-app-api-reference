#!/usr/bin/env bun

import { mkdir, writeFile, copyFile, readFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { parse, stringify } from 'yaml';

// Base directories
const SOURCE_DIR = "reference/Integration App API";
const TARGET_DIR = "reference/Integration App API/restructured";

// Structure definition based on the _order.yaml
const structure = {
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
        "Flows": {
            "Universal Flows": {
                "List flows": {"ref": "flowscontroller_listflows"},
                "Create flow": {"ref": "flowscontroller_createflow"},
                "Get flow by id": {"ref": "flowbyidcontroller_get"},
                "Export flow": {"ref": "flowbyidcontroller_export"},
                "Patch flow by id": {"ref": "flowbyidcontroller_patch"},
                "Update flow by id": {"ref": "flowbyidcontroller_put"},
                "Clone flow": {"ref": "flowbyidcontroller_clone"},
                "Apply flow to integrations": {"ref": "flowbyidcontroller_apply"},
                "Reset flow by id": {"ref": "flowbyidcontroller_reset"},
                "Archive flow by id": {"ref": "flowbyidcontroller_archive"}
            },
            "Integration-level Flows": {
                "List flows": {"ref": "integrationlevelflowscontroller_list"},
                "Create flow": {"ref": "integrationlevelflowscontroller_create"},
                "Get flow": {"ref": "integrationlevelflowcontroller_get"},
                "Patch update flow": {"ref": "integrationlevelflowcontroller_patch"},
                "Update flow": {"ref": "integrationlevelflowcontroller_put"},
                "Reset flow": {"ref": "integrationlevelflowcontroller_reset"},
                "Archive flow": {"ref": "integrationlevelflowcontroller_archive"}
            },
            "Connection-level Flows": {
                "List flow instances for connection": {"ref": "connectionlevelflowscontroller_list"},
                "Get flow instance for connection": {"ref": "connectionlevelflowcontroller_get"},
                "Patch flow instance for connection": {"ref": "connectionlevelflowcontroller_patch"},
                "Update flow instance for connection": {"ref": "connectionlevelflowcontroller_put"},
                "Setup flow instance for connection": {"ref": "connectionlevelflowcontroller_setup"},
                "Reset flow instance for connection": {"ref": "connectionlevelflowcontroller_reset"},
                "Archive flow instance for connection": {"ref": "connectionlevelflowcontroller_archive"}
            },
            "Flow Instances": {
                "List flow instances": {"ref": "flowinstancescontroller_listflowinstances"},
                "Create flow instance": {"ref": "flowinstancescontroller_createflow"},
                "Get flow instance by ID": {"ref": "flowinstancebyidcontroller_getflowinstance"},
                "Create flow instance by selector": {"ref": "flowinstancebyidcontroller_createflowinstance"},
                "Patch flow instance": {"ref": "flowinstancebyidcontroller_patchflowinstance"},
                "Put flow instance": {"ref": "flowinstancebyidcontroller_updateflowinstance"},
                "Setup flow instance": {"ref": "flowinstancebyidcontroller_setupflowinstance"},
                "Reset flow instance": {"ref": "flowinstancebyidcontroller_resetflowinstance"},
                "Export flow instance": {"ref": "flowinstancebyidcontroller_export"},
                "Archive flow instance": {"ref": "flowinstancebyidcontroller_archiveflowinstance"}
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
};

// Helper functions
async function ensureDir(dir) {
    try {
        await mkdir(dir, { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }
}

// Create directory structure and _order.yaml files
async function createStructure(structure, currentPath = "") {
    for (const [key, value] of Object.entries(structure)) {
        const path = join(TARGET_DIR, currentPath, key);
        await ensureDir(path);
        
        // Create _order.yaml for this directory
        const orderItems = [];
        for (const [itemKey, itemValue] of Object.entries(value)) {
            if (itemValue && typeof itemValue === 'object' && 'ref' in itemValue) {
                orderItems.push({ [itemKey]: { ref: itemValue.ref } });
            } else {
                orderItems.push(itemKey);
            }
        }
        
        if (orderItems.length > 0) {
            await writeFile(join(path, "_order.yaml"), stringify(orderItems));
        }
        
        // Process subdirectories
        for (const [itemKey, itemValue] of Object.entries(value)) {
            if (itemValue && typeof itemValue === 'object' && !('ref' in itemValue)) {
                await createStructure({ [itemKey]: itemValue }, join(currentPath, key));
            }
        }
    }
}

// Find files in the source directory matching a reference
async function findFile(ref, sourceDir = SOURCE_DIR) {
    try {
        const entries = await readdir(sourceDir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = join(sourceDir, entry.name);
            
            if (entry.isDirectory()) {
                const foundInSubdir = await findFile(ref, fullPath);
                if (foundInSubdir) return foundInSubdir;
            } else if (entry.name.endsWith('.md') && entry.name.includes(ref)) {
                return fullPath;
            }
        }
    } catch (err) {
        console.error(`Error searching in ${sourceDir}:`, err);
    }
    
    return null;
}

// Copy files based on the structure
async function copyFiles(structure, currentPath = "") {
    for (const [key, value] of Object.entries(structure)) {
        const path = join(TARGET_DIR, currentPath, key);
        
        if (typeof value === 'object') {
            if ('ref' in value) {
                const ref = value.ref;
                if (ref === 'proxy-api') {
                    // Special case for proxy-api.md
                    const sourceFile = join(SOURCE_DIR, 'proxy-api.md');
                    if (existsSync(sourceFile)) {
                        await copyFile(sourceFile, join(path, 'proxy-api.md'));
                        console.log(`Copied ${sourceFile} to ${join(path, 'proxy-api.md')}`);
                    }
                } else {
                    // Find the file in the source directory
                    const sourceFile = await findFile(ref);
                    if (sourceFile) {
                        const filename = sourceFile.split('/').pop();
                        await ensureDir(path); // Make sure the directory exists
                        const targetFile = join(path, filename);
                        await copyFile(sourceFile, targetFile);
                        console.log(`Copied ${sourceFile} to ${targetFile}`);
                    } else {
                        console.log(`Could not find source file for ref: ${ref}`);
                    }
                }
            } else {
                // Process subdirectories
                for (const [itemKey, itemValue] of Object.entries(value)) {
                    await copyFiles({ [itemKey]: itemValue }, join(currentPath, key));
                }
            }
        }
    }
}

// Copy overview.md to the overview directory
async function copyOverview() {
    const sourceFile = join(SOURCE_DIR, 'overview.md');
    const targetFile = join(TARGET_DIR, 'overview', 'overview.md');
    if (existsSync(sourceFile)) {
        await copyFile(sourceFile, targetFile);
    }
}

// Main execution
async function main() {
    try {
        // Create the target directory
        await ensureDir(TARGET_DIR);
        
        // Create the structure and _order.yaml files
        await createStructure(structure);
        
        // Copy files
        await copyFiles(structure);
        
        // Copy overview.md
        await copyOverview();
        
        // Create main _order.yaml
        const mainOrder = Object.keys(structure);
        await writeFile(join(TARGET_DIR, '_order.yaml'), stringify(mainOrder));
        
        console.log('Restructuring complete. Files are now organized in', TARGET_DIR);
    } catch (err) {
        console.error('Error during restructuring:', err);
    }
}

// Run the script
main(); 