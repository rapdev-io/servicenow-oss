# ServiceNow DevOps - Create Github Actions Workflow Execution
**Send Workflow Task Execution to ServiceNow**

### Example
```yaml
name: build
env:
    INSTANCE_NAME: ${{ secrets.INSTANCE_NAME }}
    DEVOPS_INTEGRATION_USER_NAME: ${{ secrets.DEVOPS_INTEGRATION_USER_NAME }}
    DEVOPS_INTEGRATION_USER_PASS: ${{ secrets.DEVOPS_INTEGRATION_USER_PASS }}
    TOOL_ID: ${{ secrets.DEVOPS_TOOL_ID }}
    ...

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: rapdev-io/snc-devops-notify@v1
        with:
         context-env: ${{ toJSON(env) }}
         context-github: ${{ toJSON(github) }}
```

An issue will be created. When the ServiceNow change is approved/denied - the issue will close. 
