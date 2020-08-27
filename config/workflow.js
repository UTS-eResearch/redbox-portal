module.exports.workflow = {
  "genericWorkspace": {
    "draft": {
      config: {
        workflow: {
          stage: 'draft',
          stageLabel: 'Draft',
        },
        authorization: {
          viewRoles: ['Admin', 'Librarians'],
          editRoles: ['Admin', 'Librarians']
        },
        form: 'genericWorkspace-1.0-draft'
      },
      starting: true
    }
  },
  "rdmp": {
    "draft": {
      config: {
        workflow: {
          stage: 'draft',
          stageLabel: '',
        },
        authorization: {
          viewRoles: ['Admin', 'Librarians'],
          editRoles: ['Admin', 'Librarians']
        },
        form: 'default-1.0-draft'
      },
      starting: true
    }
  },
  "dataRecord": {
    "draft": {
      config: {
        workflow: {
          stage: 'draft',
          stageLabel: '',
        },
        authorization: {
          viewRoles: ['Admin', 'Librarians'],
          editRoles: ['Admin', 'Librarians']
        },
        form: 'dataRecord-1.0-draft'
      },
      starting: true
    }
  },
  "dataPublication": {
    "draft": {
      config: {
        workflow: {
          stage: 'draft',
          stageLabel: 'Draft',
        },
        authorization: {
          viewRoles: ['Admin', 'Librarians'],
          editRoles: ['Admin', 'Librarians']
        },
        form: 'dataPublication-1.0-draft',
        displayIndex: 1
      },
      starting: true
    },
    "embargoed": {
      config: {
        workflow: {
          stage: 'embargoed',
          stageLabel: 'Embargoed',
        },
        authorization: {
          viewRoles: ['Admin', 'Librarians'],
          editRoles: ['Admin', 'Librarians']
        },
        form: 'dataPublication-1.0-embargoed',
        displayIndex: 2
      }
    },
    "reviewing": {
      config: {
        workflow: {
          stage: 'reviewing',
          stageLabel: 'Reviewing',
        },
        authorization: {
          viewRoles: ['Admin', 'Librarians'],
          editRoles: ['Admin'],
          transitionRoles: ['Researcher', 'Admin', 'Librarians']
        },
        form: 'dataPublication-1.0-reviewing',
        displayIndex: 3
      }
    },
    "published": {
      config: {
        workflow: {
          stage: 'published',
          stageLabel: 'Published',
        },
        authorization: {
          viewRoles: ['Admin', 'Librarians'],
          editRoles: ['Admin', 'Librarians'],
          transitionRoles: ['Admin', 'Librarians']
        },
        form: 'dataPublication-1.0-published',
        displayIndex: 4
      }
    },
    "retired": {
      config: {
        workflow: {
          stage: 'retired',
          stageLabel: 'Retired',
        },
        authorization: {
          viewRoles: ['Admin', 'Librarians'],
          editRoles: ['Admin', 'Librarians'],
          transitionRoles: ['Admin', 'Librarians']
        },
        form: 'dataPublication-1.0-retired',
        displayIndex: 5
      }
    }

  }
};
