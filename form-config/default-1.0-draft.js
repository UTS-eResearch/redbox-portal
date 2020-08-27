/**
 * RDMP form
 */
module.exports = {
  name: 'default-1.0-draft',
  type: 'rdmp',
  skipValidationOnSave: false,
  editCssClasses: 'row col-md-12',
  viewCssClasses: 'row col-md-offset-1 col-md-10',
  messages: {
    "saving": ["@dmpt-form-saving"],
    "validationFail": ["@dmpt-form-validation-fail-prefix", "@dmpt-form-validation-fail-suffix"],
    "saveSuccess": ["@dmpt-form-save-success"],
    "saveError": ["@dmpt-form-save-error"]
  },
  attachmentFields: [
    "licences_agreements"
  ],
  fields: [
    {
      class: 'TextField',
      definition: {
        visible: false,
        visibilityCriteria: true,
        name: 'human_participant_data',
        label: 'human_participant_data',
        publishTag: 'human_participant_data',
        type: 'text',
        publish: {
          onValueUpdate: {
            modelEventSource: 'valueChanges'
          }
        },
        subscribe: {
          'ethics_describe': {
            onItemSelect: [{
              debug: 'onItemSelect:human_participant_data:subscribedto:ethics_describe',
              action: 'setProp',
              valueTest: ['human_participant_data'],
              props: [
                {key: 'value', val: 'human_participant_data', clear: true}
              ]
            }]
          }
        }
      }
    },
    {
      class: 'TextField',
      definition: {
        visible: false,
        visibilityCriteria: true,
        name: 'human_participant_data_identifiable',
        label: 'human_participant_data_identifiable',
        publishTag: 'human_participant_data_identifiable',
        type: 'text',
        modifies: [
          'ethics_human_participant_data_severity_risk',
          'ethics_identifiable_other_countries',
          'ethics_identifiable_data',
          'ethics_identifiable_collection',
          'ethics_identifiable_collection_other_text',
          'ethics_identifiable_storage',
          'ethics_identifiable_storage_other_text',
          'ethics_identifiable_informed_consent_publish',
          'ethics_identifiable_transfered_out',
          'ethics_identifiable_transfered_out_yes_text',
          'ethics_identifiable_deidentify',
          'ethics_identifiable_deidentify_no_text'
        ],
        revert: '',
        publish: {
          onValueUpdate: {
            modelEventSource: 'valueChanges'
          }
        },
        subscribe: {
          'ethics_identifiable': {
            onValueUpdate: [{
              debug: 'onItemSelect:human_participant_data_identifiable:subscribedto:ethics_describe',
              action: 'setProp',
              valueTest: ['ethics_identifiable'],
              valueFalse: 'ethics_identifiable_no',
              props: [
                {key: 'value', val: 'human_participant_data_identifiable', clear: true}
              ]
            }]
          },
          'ethics_describe': {
            onItemSelect: [{
              action: 'setProp',
              valueTest: ['human_participant_data'],
              props: [
                {key: 'value', val: '', clear: true}
              ]
            }]
          },
          'human_participant_data': {
            onValueUpdate: [{
              debug: 'onValueUpdate:human_participant_data_identifiable:subscribedto:human_participant_data',
              action: 'setProp',
              valueTest: ['human_participant_data'],
              valueFalse: '',
              props: [
                {key: 'value', val: '', clear: true}
              ]
            }]
          }
        }
      }
    },
    {
      class: 'TextField',
      definition: {
        visible: false,
        visibilityCriteria: true,
        name: 'human_participant_data_identifiable_consent',
        label: 'human_participant_data_identifiable_consent',
        publishTag: 'human_participant_data_identifiable_consent',
        type: 'text',
        publish: {
          onValueUpdate: {
            modelEventSource: 'valueChanges'
          }
        },
        subscribe: {
          'ethics_identifiable_informed_consent_publish': {
            onItemSelect: [{
              debug: 'onItemSelect:human_participant_data_identifiable_consent:subscribedto:ethics_identifiable_informed_consent_publish',
              action: 'setProp',
              valueSet: true
            }]
          },
          'ethics_identifiable': {
            onValueUpdate: [{
              debug: 'onItemSelect:ethics_human_participant_data_severity_risk:subscribedto:ethics_identifiable',
              action: 'setProp',
              valueTest: ['yes', 'ethics_identifiable'],
              valueFalse: ['no', 'ethics_identifiable_no'],
              props: [
                {key: 'value', val: '', clear: true},
              ]
            }]
          },
          'human_participant_data': {
            onValueUpdate: [{
              debug: 'onValueUpdate:human_participant_data_identifiable_consent:subscribedto:human_participant_data',
              action: 'setProp',
              valueTest: ['human_participant_data'],
              valueFalse: '',
              props: [
                {key: 'value', val: '', clear: true}
              ]
            }]
          }
        }
      }
    },
    {
      class: 'TextField',
      definition: {
        visible: false,
        visibilityCriteria: true,
        name: 'indigenous_cultural_intelectual_property',
        label: 'indigenous_cultural_intelectual_property',
        publishTag: 'indigenous_cultural_intelectual_property',
        type: 'text',
        publish: {
          onValueUpdate: {
            modelEventSource: 'valueChanges'
          }
        },
        subscribe: {
          'ethics_describe': {
            onItemSelect: [{
              debug: 'onItemSelect:indigenous_cultural_intelectual_property:subscribedto:ethics_describe',
              action: 'setProp',
              valueTest: ['indigenous_cultural_intelectual_property'],
              props: [
                {key: 'value', val: 'indigenous_cultural_intelectual_property', clear: true}
              ]
            }]
          }
        }
      }
    },
    {
      class: 'TextField',
      definition: {
        visible: false,
        visibilityCriteria: true,
        name: 'ethics_third_party',
        label: 'ethics_third_party',
        publishTag: 'ethics_third_party',
        type: 'text',
        publish: {
          onValueUpdate: {
            modelEventSource: 'valueChanges'
          }
        },
        subscribe: {
          'ethics_data_secondary_third_party': {
            onItemSelect: [{
              debug: 'ethics_third_party',
              action: 'setProp',
              valueTest: ['yes'],
              props: [
                {key: 'value', val: 'ethics_third_party', val2: ''},
              ]
            }]
          }
        }
      }
    },
    {
      class: 'Container',
      compClass: 'TextBlockComponent',
      viewOnly: true,
      definition: {
        name: 'title',
        type: 'h1'
      }
    },
    {
      class: 'Container',
      compClass: 'GenericGroupComponent',
      definition: {
        cssClasses: "form-inline",
        fields: [{
          class: "AnchorOrButton",
          viewOnly: true,
          definition: {
            label: '@dmp-edit-record-link',
            value: '/@branding/@portal/record/edit/@oid',
            cssClasses: 'btn btn-large btn-info',
            showPencil: true,
            controlType: 'anchor'
          },
          variableSubstitutionFields: ['value']
        },
          {
            class: "AnchorOrButton",
            viewOnly: true,
            definition: {
              label: '@dmp-create-datarecord-link',
              value: '/@branding/@portal/record/dataRecord/edit?rdmpOid=@oid',
              cssClasses: 'btn btn-large btn-info margin-15',
              controlType: 'anchor'
            },
            variableSubstitutionFields: ['value']
          },
          {
            class: 'PDFList',
            viewOnly: true,
            definition: {
              name: 'pdf',
              label: 'pdf',
              cssClasses: 'btn btn-large btn-info margin-15'
            }
          }
        ]
      }
    },
    {
      class: 'TextArea',
      viewOnly: true,
      definition: {
        name: 'description',
        label: 'Description'
      }
    },
    {
      class: "TabOrAccordionContainer",
      compClass: "TabOrAccordionContainerComponent",
      definition: {
        id: "mainTab",
        accContainerClass: "view-accordion",
        expandAccordionsOnOpen: true,
        fields: [
          // -------------------------------------------------------------------
          // Project Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "project",
              label: "@dmpt-project-tab",
              active: true,
              fields: [{
                class: 'Container',
                compClass: 'TextBlockComponent',
                definition: {
                  value: '@dmpt-project-heading',
                  type: 'h3'
                }
              },
                {
                  class: 'VocabField',
                  compClass: 'VocabFieldComponent',
                  definition: {
                    name: 'title',
                    label: "@dmpt-project-title",
                    help: "@dmpt-project-title-help",
                    forceClone: ['lookupService', 'completerService'],
                    disableEditAfterSelect: false,
                    disabledExpression: '<%= !_.isEmpty(oid) && (_.indexOf(user.roles, \'Admin\') == -1) %>',
                    vocabId: '\"Research Activities\"%20AND%20(text_status:(%22Completed%22%20OR%20%22Applied%22%20OR%20%22Approved%22%20OR%20%22Closed%20Off%22%20OR%20%22Combined%22%20OR%20%22Transferred%22))',
                    sourceType: 'mint',
                    fieldNames: ['dc_title', 'folio', 'description', 'summary', 'refId', 'keyword', 'startDate', 'endDate', 'organization', 'fundingSource', 'rmId'],
                    searchFields: 'autocomplete_title',
                    titleFieldArr: ['dc_title'],
                    stringLabelToField: 'dc_title',
                    storeLabelOnly: true,
                    publish: {},
                    required: true
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    name: 'dc:identifier',
                    label: '@dmpt-project-id',
                    help: '@dmpt-project-id-help',
                    type: 'text',
                    required: true,
                    subscribe: {
                      title: {
                        onItemSelect: [{
                          action: 'reset'
                        },
                          {
                            action: 'utilityService.getFirstofArray',
                            field: 'rmId'
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  class: 'Toggle',
                  compClass: 'ToggleComponent',
                  variableSubstitutionFields: ['valueCheck'],
                  definition: {
                    valueCheck: '@user_edupersonscopedaffiliation',
                    name: 'project-hdr',
                    checkedWhen: 'student@uts.edu.au',
                    label: '@dmpt-project-hdr',
                    help: '@dmpt-project-hdr-help',
                    controlType: 'checkbox'
                  }
                },
                {
                  class: 'TextArea',
                  compClass: 'TextAreaComponent',
                  definition: {
                    name: 'description',
                    label: '@dmpt-project-desc',
                    help: '@dmpt-project-desc-help',
                    rows: 10,
                    cols: 10,
                    required: true,
                    subscribe: {
                      title: {
                        onItemSelect: [{
                          action: 'reset'
                        },
                          {
                            action: 'utilityService.concatenate',
                            fields: [
                              'description',
                              'summary'
                            ],
                            delim: ' '
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    type: 'hr'
                  }
                },
                {
                  class: 'RepeatableContainer',
                  compClass: 'RepeatableTextfieldComponent',
                  definition: {
                    label: '@dmpt-finalKeywords',
                    help: '@dmpt-finalKeywords-help',
                    name: 'finalKeywords',
                    fields: [{
                      class: 'TextField',
                      definition: {
                        required: false,
                        type: 'text',
                        validationMessages: {
                          required: "@dataRecord-keywords-required"
                        }
                      }
                    }],
                    subscribe: {
                      title: {
                        onItemSelect: [{
                          action: 'reset'
                        },
                          {
                            action: 'utilityService.splitArrayStringsToArray',
                            field: 'keyword',
                            regex: ',|;',
                            flags: 'i'
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  /* hide the website field
                  class: 'TextField',
                  */
                  class: 'HiddenValue',
                  compClass: 'HiddenValueComponent',
                  definition: {
                    name: 'dc:relation_bibo:Website',
                    label: '@dmpt-project-website',
                    help: '@dmpt-project-website-help',
                    type: 'text'
                  }
                },
                {
                  class: 'DateTime',
                  definition: {
                    name: "dc:coverage_vivo:DateTimeInterval_vivo:start",
                    label: "@dmpt-project-startdate",
                    help: '@dmpt-project-startdate-help',
                    datePickerOpts: {
                      format: 'dd/mm/yyyy',
                      startView: 2,
                      icon: 'fa fa-calendar',
                      autoclose: true
                    },
                    timePickerOpts: false,
                    hasClearButton: false,
                    valueFormat: 'YYYY-MM-DD',
                    displayFormat: 'DD/MM/YYYY',
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      title: {
                        onItemSelect: [
                          {
                            action: 'reset'
                          },
                          {
                            action: 'utilityService.convertToDateFormat',
                            field: 'startDate',
                            delim: ',',
                            formatOrigin: 'DD-MMM-YY',
                            formatTarget: 'YYYY-MM-DD'
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  class: 'DateTime',
                  definition: {
                    name: "dc:coverage_vivo:DateTimeInterval_vivo:end",
                    label: "@dmpt-project-enddate",
                    help: '@dmpt-project-enddate-help',
                    datePickerOpts: {
                      format: 'dd/mm/yyyy',
                      startView: 2,
                      icon: 'fa fa-calendar',
                      autoclose: true
                    },
                    timePickerOpts: false,
                    hasClearButton: false,
                    valueFormat: 'YYYY-MM-DD',
                    displayFormat: 'DD/MM/YYYY',
                    subscribe: {
                      'dc:coverage_vivo:DateTimeInterval_vivo:start': {
                        onValueUpdate: []
                      },
                      title: {
                        onItemSelect: [
                          {
                            action: 'reset'
                          },
                          {
                            action: 'utilityService.convertToDateFormat',
                            field: 'endDate',
                            delim: ',',
                            formatOrigin: 'DD-MMM-YY',
                            formatTarget: 'YYYY-MM-DD'
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  class: 'RepeatableContainer',
                  compClass: 'RepeatableVocabComponent',
                  definition: {
                    name: 'foaf:fundedBy_foaf:Agent',
                    label: "@dmpt-foaf:fundedBy_foaf:Agent",
                    help: "@dmpt-foaf:fundedBy_foaf:Agent-help",
                    forceClone: ['lookupService', 'completerService'],
                    fields: [{
                      class: 'VocabField',
                      definition: {
                        disableEditAfterSelect: false,
                        vocabId: '\"Funding Bodies\"',
                        sourceType: 'mint',
                        fieldNames: ['dc_title', 'dc_identifier', 'ID', 'repository_name'],
                        searchFields: 'dc_title',
                        titleFieldArr: ['dc_title'],
                        stringLabelToField: 'dc_title'
                      }
                    }]
                  }
                },
                {
                  class: 'RepeatableVocab',
                  compClass: 'RepeatableVocabComponent',
                  definition: {
                    name: 'foaf:fundedBy_vivo:Grant',
                    label: '@dmpt-foaf:fundedBy_vivo:Grant',
                    help: '@dmpt-foaf:fundedBy_vivo:Grant-help',
                    forceClone: ['lookupService', 'completerService'],
                    fields: [{
                      class: 'VocabField',
                      definition: {
                        disableEditAfterSelect: false,
                        vocabId: '\"Research Activities\"',
                        sourceType: 'mint',
                        fieldNames: ['dc_title', 'grant_number', 'foaf_name', 'dc_identifier', 'known_ids', 'repository_name'],
                        searchFields: 'grant_number,dc_title',
                        titleFieldArr: ['grant_number', 'dc_title'],
                        stringLabelToField: 'dc_title'
                      }
                    }],
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges',
                        fields: [{
                          'grant_number': 'grant_number[0]'
                        },
                          {
                            'dc_title': 'dc_title'
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  // hide the FOR codes https://synergy.itd.uts.edu.au/jira/browse/ST-634
                  // class: 'ANDSVocab',
                  // compClass: 'ANDSVocabComponent',
                  class: 'HiddenValue',
                  compClass: 'HiddenValueComponent',
                  definition: {
                    visible: false,
                    label: "@dmpt-project-anzsrcFor",
                    help: "@dmpt-project-anzsrcFor-help",
                    name: "dc:subject_anzsrc:for",
                    vocabId: 'anzsrc-for'
                  }
                },
                {
                  /* hide the SEO field
                  class: 'ANDSVocab',
                  compClass: 'ANDSVocabComponent',*/
                  class: 'HiddenValue',
                  compClass: 'HiddenValueComponent',
                  definition: {
                    label: "@dmpt-project-anzsrcSeo",
                    help: "@dmpt-project-anzsrcSeo-help",
                    name: "dc:subject_anzsrc:seo",
                    vocabId: 'anzsrc-seo'
                  }
                }
              ]
            }
          },
          // -------------------------------------------------------------------
          // People Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "people",
              label: "@dmpt-people-tab",
              fields: [{
                class: 'Container',
                compClass: 'TextBlockComponent',
                definition: {
                  value: '@dmpt-people-tab',
                  type: 'h3'
                }
              },
                {
                  class: 'ContributorField',
                  showHeader: true,
                  showRole: false,
                  definition: {
                    name: 'contributor_ci',
                    required: true,
                    label: '@dmpt-people-tab-ci',
                    help: '@dmpt-people-tab-ci-help',
                    role: "@dmpt-people-tab-ci-role",
                    freeText: false,
                    forceLookupOnly: true,
                    vocabId: 'Parties AND repository_name:People%20AND%20(*%3A*%20-text_has_appointment:NULL)',
                    sourceType: 'mint',
                    disabledExpression: '<%= !_.isEmpty(oid) %>',
                    fieldNames: [{
                      'text_full_name': 'text_full_name'
                    }, {
                      'full_name_honorific': 'text_full_name_honorific'
                    }, {
                      'email': 'Email[0]'
                    },
                      {
                        'given_name': 'Given_Name[0]'
                      },
                      {
                        'family_name': 'Family_Name[0]'
                      },
                      {
                        'honorific': 'Honorific[0]'
                      },
                      {
                        'full_name_family_name_first': 'dc_title'
                      }
                    ],
                    searchFields: 'autocomplete_given_name,autocomplete_family_name,autocomplete_full_name',
                    titleFieldArr: ['text_full_name'],
                    titleFieldDelim: '',
                    titleCompleterDescription: 'Email',
                    nameColHdr: '@dmpt-people-tab-name-hdr',
                    emailColHdr: '@dmpt-people-tab-email-hdr',
                    orcidColHdr: '@dmpt-people-tab-orcid-hdr',
                    validation_required_name: '@dmpt-people-tab-validation-name-required',
                    validation_required_email: '@dmpt-people-tab-validation-email-required',
                    validation_invalid_email: '@dmpt-people-tab-validation-email-invalid',
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    findRelationshipFor: ['student@uts.edu.au'],
                    findRelationship: {
                      relationship: 'dc_supervisor',
                      relateWith: 'userEmail',
                      role: 'Chief Investigator',
                      searchField: 'Email',
                      searchRelation: 'dc_utsId',
                      title: 'text_full_name',
                      fullNameHonorific: 'text_full_name_honorific',
                      honorific: 'honorific',
                      email: 'dc_email',
                      givenName: 'text_given_name',
                      familyName: 'text_family_name'
                    },
                    userEmail: '@user_email',
                    relationshipFor: '@user_edupersonscopedaffiliation',
                  },
                  variableSubstitutionFields: ['userEmail', 'relationshipFor']
                },
                {
                  class: 'ContributorField',
                  showHeader: true,
                  definition: {
                    name: 'contributor_data_manager',
                    required: true,
                    label: '@dmpt-people-tab-data-manager',
                    help: '@dmpt-people-tab-data-manager-help',
                    role: "@dmpt-people-tab-data-manager-role",
                    freeText: false,
                    vocabId: 'Parties AND repository_name:People%20AND%20(*%3A*%20-text_has_appointment:NULL)',
                    sourceType: 'mint',
                    disabledExpression: '<%= !_.isEmpty(oid) %>',
                    fieldNames: [{
                      'text_full_name': 'text_full_name'
                    }, {
                      'full_name_honorific': 'text_full_name_honorific'
                    }, {
                      'email': 'Email[0]'
                    },
                      {
                        'given_name': 'Given_Name[0]'
                      },
                      {
                        'family_name': 'Family_Name[0]'
                      },
                      {
                        'honorific': 'Honorific[0]'
                      },
                      {
                        'full_name_family_name_first': 'dc_title'
                      }
                    ],
                    searchFields: 'autocomplete_given_name,autocomplete_family_name,autocomplete_full_name',
                    titleFieldArr: ['text_full_name'],
                    titleFieldDelim: '',
                    titleCompleterDescription: 'Email',
                    nameColHdr: '@dmpt-people-tab-name-hdr',
                    emailColHdr: '@dmpt-people-tab-email-hdr',
                    orcidColHdr: '@dmpt-people-tab-orcid-hdr',
                    showRole: false,
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    value: {
                      name: '@user_name',
                      email: '@user_email',
                      username: '@user_username',
                      text_full_name: '@user_name'
                    }
                  },
                  variableSubstitutionFields: ['value.name', 'value.email', 'value.username', 'value.text_full_name']
                },
                {
                  class: 'RepeatableContributor',
                  compClass: 'RepeatableContributorComponent',
                  definition: {
                    name: "contributors",
                    skipClone: ['showHeader', 'initialValue'],
                    forceClone: [{
                      field: 'vocabField',
                      skipClone: ['injector']
                    }],
                    fields: [{
                      class: 'ContributorField',
                      showHeader: true,
                      definition: {
                        required: false,
                        label: '@dmpt-people-tab-contributors',
                        help: '@dmpt-people-tab-contributors-help',
                        role: "@dmpt-people-tab-contributors-role",
                        freeText: false,
                        vocabId: 'Parties AND repository_name:People%20AND%20(*%3A*%20-text_has_appointment:NULL)',
                        sourceType: 'mint',
                        fieldNames: [{
                          'text_full_name': 'text_full_name'
                        }, {
                          'full_name_honorific': 'text_full_name_honorific'
                        }, {
                          'email': 'Email[0]'
                        },
                          {
                            'given_name': 'Given_Name[0]'
                          },
                          {
                            'family_name': 'Family_Name[0]'
                          },
                          {
                            'honorific': 'Honorific[0]'
                          },
                          {
                            'full_name_family_name_first': 'dc_title'
                          }
                        ],
                        searchFields: 'autocomplete_given_name,autocomplete_family_name,autocomplete_full_name',
                        titleFieldArr: ['text_full_name'],
                        titleFieldDelim: '',
                        titleCompleterDescription: 'Email',
                        nameColHdr: '@dmpt-people-tab-name-hdr',
                        emailColHdr: '@dmpt-people-tab-email-hdr',
                        orcidColHdr: '@dmpt-people-tab-orcid-hdr',
                        showRole: false,
                        activeValidators: {}
                      }
                    }]
                  }
                },
                {
                  class: 'RepeatableContributor',
                  compClass: 'RepeatableContributorComponent',
                  definition: {
                    name: "contributor_supervisors",
                    skipClone: ['showHeader', 'initialValue'],
                    forceClone: [{
                      field: 'vocabField',
                      skipClone: ['injector']
                    }],
                    fields: [{
                      class: 'ContributorField',
                      showHeader: true,
                      definition: {
                        required: false,
                        label: '@dmpt-people-tab-supervisor',
                        help: '@dmpt-people-tab-supervisor-help',
                        role: "@dmpt-people-tab-supervisor-role",
                        freeText: false,
                        vocabId: 'Parties AND repository_name:People%20AND%20(*%3A*%20-text_has_appointment:NULL)',
                        sourceType: 'mint',
                        fieldNames: [{
                          'text_full_name': 'text_full_name'
                        }, {
                          'full_name_honorific': 'text_full_name_honorific'
                        }, {
                          'email': 'Email[0]'
                        },
                          {
                            'given_name': 'Given_Name[0]'
                          },
                          {
                            'family_name': 'Family_Name[0]'
                          },
                          {
                            'honorific': 'Honorific[0]'
                          },
                          {
                            'full_name_family_name_first': 'dc_title'
                          }
                        ],
                        searchFields: 'autocomplete_given_name,autocomplete_family_name,autocomplete_full_name',
                        titleFieldArr: ['text_full_name'],
                        titleFieldDelim: '',
                        titleCompleterDescription: 'Email',
                        nameColHdr: '@dmpt-people-tab-name-hdr',
                        emailColHdr: '@dmpt-people-tab-email-hdr',
                        orcidColHdr: '@dmpt-people-tab-orcid-hdr',
                        showRole: false,
                        publish: {
                          onValueUpdate: {
                            modelEventSource: 'valueChanges'
                          }
                        }
                      }
                    }]
                  }
                }
              ]
            }
          },
          // -------------------------------------------------------------------
          // New
          // Ethics Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "ethics",
              label: "@dmpt-ethics-tab",
              fields: [{
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    value: '@dmpt-ethics-heading',
                    type: 'h3'
                  }
                },
                {
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  visible: true,
                  definition: {
                    value: '@dmpt-ethics:iscs:initial',
                    type: 'h5'
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    name: 'ethics_iscs',
                    value: '@dmpt-ethics:iscs:initial',
                    help: '@dmpt-ethics:iscs:initial:help',
                    type: 'p',
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    required: true,
                    name: 'dmpt_ethics_iscs',
                    label: '@dmpt-ethics:iscs',
                    help: '@dmpt-ethics:iscs:help',
                    publishTag: 'dmpt_ethics_iscs',
                    controlType: 'radio',
                    defaultValue: 'iscs_sensitive',
                    options: [{
                        value: "iscs_public",
                        label: "@dmpt-ethics:iscs:public"
                      },
                      {
                        value: "iscs_internal",
                        label: "@dmpt-ethics:iscs:internal"
                      },
                      {
                      value: "iscs_sensitive",
                      label: "@dmpt-ethics:iscs:sensitive"
                      },
                      {
                      value: "iscs_confidential",
                      label: "@dmpt-ethics:iscs:confidential"
                      }],
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'ethics_describe': {
                        onItemSelect: [{
                          debug: 'dmpt_ethics_iscs:subscribedto:ethics_describe',
                          action: 'setProp',
                          valueCase: [
                            {val: 'human_participant_data', set: 'iscs_confidential'},
                            {val: 'commercially_sensitive_data', set: 'iscs_confidential'},
                            {val: 'clinical_trials', set: 'iscs_confidential'},
                            {val: 'policed_data', set: 'iscs_confidential'},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    required: false,
                    name: 'ethics_describe',
                    label: '@dmpt-ethics:describe',
                    help: '@dmpt-ethics:describe:help',
                    hasValueLabel: '@select-confirm-changes-multivalues',
                    confirmChangesLabel: '@select-confirm-changes',
                    confirmChangesParagraphLabel: '@select-confirm-changes-paragraph',
                    controlType: 'checkbox',
                    options: [{
                        value: "human_participant_data",
                        label: "@dmpt-ethics:describe:human_participant_data",
                        publishTag: "human_participant_data",
                        revert: '',
                        modifies: [
                          'ethics_human_participant_data_personal',
                          'ethics_human_participant_data_sensitive_personal',
                          'ethics_human_participant_data_health',
                          'ethics_identifiable',
                          'ethics_human_participant_data_severity_risk',
                          'ethics_identifiable_other_countries',
                          'ethics_identifiable_data',
                          'ethics_identifiable_collection',
                          'ethics_identifiable_collection_other_text',
                          'ethics_identifiable_storage',
                          'ethics_identifiable_storage_other_text',
                          'ethics_identifiable_informed_consent_publish',
                          'ethics_identifiable_transfered_out',
                          'ethics_identifiable_transfered_out_yes_text',
                          'ethics_identifiable_deidentify',
                          'ethics_identifiable_deidentify_no_text'
                        ]
                      },{
                        value: "animal_use",
                        label: "@dmpt-ethics:describe:animal_use",
                        publishTag: "ethics_approval_required"
                      },
                      {
                        value: "gmos",
                        label: "@dmpt-ethics:describe:gmos",
                        publishTag: "ethics_approval_required"
                      },
                      {
                        value: "infectious_materials_pathogens_cytotoxic_substances",
                        label: "@dmpt-ethics:describe:infectious_materials_pathogens_cytotoxic_substances",
                        publishTag: "ethics_approval_required"
                      },
                      {
                        value: "ionizing_radiation",
                        label: "@dmpt-ethics:describe:ionizing_radiation",
                        publishTag: "ethics_approval_required"
                      },
                      {
                        value: "clinical_trials",
                        label: "@dmpt-ethics:describe:clinical_trials",
                        publishTag: "clinical_trials",
                      },
                      {
                        value: "commercially_sensitive_data",
                        label: "@dmpt-ethics:describe:commercially_sensitive_data",
                        publishTag: "commercially_sensitive_data",
                      },
                      {
                        value: "policed_data",
                        label: "@dmpt-ethics:describe:policed_data",
                        publishTag: "policed_data"
                      },
                      {
                        value: "indigenous_cultural_intelectual_property",
                        label: "@dmpt-ethics:describe:indigenous_cultural_intelectual_property",
                        publishTag: "indigenous_cultural_intelectual_property",
                        modifies: [
                          'ethics_indigenous_data_ownership',
                          'ethics_indigenous_data_access'
                        ]
                      },
                      {
                        value: "other",
                        label: "@dmpt-ethics:describe:other",
                        publishTag: "other",
                        modifies: ['ethics_describe_other']
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      },
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_describe_other',
                      field: 'ethics_describe',
                      fieldValue : 'other'
                    },
                    name: 'ethics_describe_other',
                    label: '@dmpt-ethics:describe:other:text',
                    help: '@dmpt-ethics:describe:other:help',
                    type: 'text',
                    subscribe: {
                      'ethics_describe': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_describe_other:subscribedto:ethics_describe',
                          action: 'setProp',
                          defer: false,
                          valueTest: ['other'],
                          valueFalse: [''],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    required: false,
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_human_participant_data_personal',
                      field: 'human_participant_data',
                      fieldValue : 'human_participant_data'
                    },
                    name: 'ethics_human_participant_data_personal',
                    label: '@dmpt-ethics:human_participant_data:personal',
                    help: '@dmpt-ethics:human_participant_data:individual:help',
                    controlType: 'radio',
                    options: [{
                      value: "yes",
                      label: "Yes"
                    },
                      {
                        value: "no",
                        label: "No"
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'human_participant_data': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_human_participant_data_individual_personal:subscribedto:human_participant_data',
                          action: 'setProp',
                          valueTest: ['human_participant_data'],
                          valueFalse: '',
                          props: [
                            {key: 'visible', val: true},
                            {key: 'required', val: true},
                            {key: 'value', val: ''}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    required: false,
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_human_participant_data_sensitive_personal',
                      field: 'human_participant_data',
                      fieldValue : 'human_participant_data'
                    },
                    name: 'ethics_human_participant_data_sensitive_personal',
                    label: '@dmpt-ethics:human_participant_data:sensitive_personal',
                    help: '@dmpt-ethics:human_participant_data:individual:help',
                    controlType: 'radio',
                    options: [{
                      value: "yes",
                      label: "Yes"
                    },
                      {
                        value: "no",
                        label: "No"
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'human_participant_data': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_human_participant_data_sensitive_personal:subscribedto:human_participant_data',
                          action: 'setProp',
                          valueTest: ['human_participant_data'],
                          valueFalse: '',
                          props: [
                            {key: 'visible', val: true},
                            {key: 'required', val: true},
                            {key: 'value', val: ''}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    required: false,
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_human_participant_data_health',
                      field: 'human_participant_data',
                      fieldValue : 'human_participant_data'
                    },
                    name: 'ethics_human_participant_data_health',
                    label: '@dmpt-ethics:human_participant_data:health',
                    help: '@dmpt-ethics:human_participant_data:individual:help',
                    controlType: 'radio',
                    options: [{
                      value: "yes",
                      label: "Yes"
                    },
                      {
                        value: "no",
                        label: "No"
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'human_participant_data': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_human_participant_data_health:subscribedto:human_participant_data',
                          action: 'setProp',
                          valueTest: ['human_participant_data'],
                          valueFalse: '',
                          props: [
                            {key: 'visible', val: true},
                            {key: 'required', val: true},
                            {key: 'value', val: ''}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable',
                      field: 'human_participant_data',
                      fieldValue : 'human_participant_data'
                    },
                    name: 'ethics_identifiable',
                    label: '@dmpt-ethics:identifiable',
                    help: '@dmpt-ethics:identifiable:help',
                    hasValueLabel: '@select-confirm-changes-multivalues',
                    confirmChangesLabel: '@select-confirm-changes',
                    confirmChangesParagraphLabel: '@select-confirm-changes-paragraph',
                    controlType: 'radio',
                    options: [{
                        value: "yes",
                        label: "Yes",
                        publishTag: "ethics_identifiable"
                      },
                      {
                        value: "no",
                        label: "No",
                        publishTag: "ethics_identifiable_no",
                        revert: "yes",
                        modifies: [
                          'ethics_human_participant_data_severity_risk',
                          'ethics_identifiable_other_countries',
                          'ethics_identifiable_data',
                          'ethics_identifiable_collection',
                          'ethics_identifiable_collection_other_text',
                          'ethics_identifiable_storage',
                          'ethics_identifiable_storage_other_text',
                          'ethics_identifiable_informed_consent_publish',
                          'ethics_identifiable_transfered_out',
                          'ethics_identifiable_transfered_out_yes_text',
                          'ethics_identifiable_deidentify',
                          'ethics_identifiable_deidentify_no_text'
                        ]
                      }
                    ],
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'human_participant_data': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_identifiable:subscribedto:human_participant_data',
                          action: 'setProp',
                          valueTest: ['human_participant_data'],
                          valueFalse: '',
                          props: [
                            {key: 'visible', val: true},
                            {key: 'required', val: true},
                            {key: 'value', val: '', clear: true}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_human_participant_data_severity_risk',
                      field: 'human_participant_data_identifiable',
                      fieldValue : 'human_participant_data_identifiable'
                    },
                    name: 'ethics_human_participant_data_severity_risk',
                    label: '@dmpt-ethics:human_participant_data:severity_risk',
                    help: '@dmpt-ethics:human_participant_data:severity_risk:help',
                    type: 'text',
                    subscribe: {
                      'ethics_describe': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_human_participant_data_severity_risk:subscribedto:ethics_describe',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['human_participant_data'],
                          valueFalse: [''],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                          ]
                        }]
                      },
                      'ethics_identifiable': {
                        onValueUpdate: [{
                          debug: 'onItemSelect:ethics_human_participant_data_severity_risk:subscribedto:ethics_identifiable',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['yes', 'ethics_identifiable'],
                          valueFalse: ['no', 'ethics_identifiable_no'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'required', val: true},
                            {key: 'visible', val: true},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_other_countries',
                      field: 'human_participant_data_identifiable',
                      fieldValue : 'human_participant_data_identifiable'
                    },
                    name: 'ethics_identifiable_other_countries',
                    label: '@dmpt-ethics:identifiable:other_countries',
                    help: '@dmpt-ethics:identifiable:other_countries:help',
                    type: 'text',
                    subscribe: {
                      'ethics_describe': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_identifiable_other_countries:subscribedto:ethics_describe',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['human_participant_data'],
                          valueFalse: [''],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                          ]
                        }]
                      },
                      'ethics_identifiable': {
                        onValueUpdate: [{
                          debug: 'onItemSelect:ethics_identifiable_other_countries:subscribedto:ethics_identifiable',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['yes', 'ethics_identifiable'],
                          valueFalse: ['no', 'ethics_identifiable_no'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    required: true,
                    name: 'ethics_approval',
                    label: '@dmpt-ethics:approval',
                    help: '@dmpt-ethics:approval:help',
                    controlType: 'radio',
                    options: [{
                      value: "yes",
                      label: "Yes",
                      publishTag: "ethics_approval"
                    },
                      {
                        value: "no",
                        label: "No",
                        publishTag: "ethics_approval"
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'ethics_describe': {
                        onValueUpdate: [{
                          debug: 'ethics_approval:subscribedto:ethics_describe',
                          action: 'setProp',
                          valueTest: [
                            'human_participant_data', 'ethics_approval_required', 'clinical_trials'
                          ],
                          props: [
                            {key: 'value', val: 'yes'}
                          ]
                        }]
                      }
                    }
                  }
                }
              ]
            }
          },
          // -------------------------------------------------------------------
          // New Data Collection and Storage Tab
          // ---------
          {
            class: "Container",
            definition: {
              id: "dataCollection",
              label: "@dmpt-data-collection-tab",
              fields: [{
                class: 'Container',
                compClass: 'TextBlockComponent',
                definition: {
                  value: '@dmpt-data-collection-heading',
                  type: 'h3'
                }
              },
                {
                  class: 'TextArea',
                  compClass: 'TextAreaComponent',
                  definition: {
                    name: 'vivo:Dataset_redbox:DataCollectionMethodology',
                    label: '@dmpt-data-collection-methodology',
                    help: '@dmpt-data-collection-methodology-help',
                    rows: 5,
                    columns: 10,
                    required: true,
                    validationMessages: {
                      required: "@dmpt-data-collection-methodology-required"
                    }
                  }
                },
                {
                  class: 'TextArea',
                  compClass: 'TextAreaComponent',
                  definition: {
                    name: 'vivo:Dataset_dc_format',
                    label: '@dmpt-vivo:Dataset_dc_format',
                    help: '@dmpt-vivo:Dataset_dc_format-help',
                    rows: 5,
                    columns: 10,
                    required: true,
                    validationMessages: {
                      required: "@dmpt-vivo:Dataset_dc_format-required"
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'DropdownFieldComponent',
                  definition: {
                    name: 'vivo:Dataset_dc:location_rdf:PlainLiteral',
                    label: '@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral',
                    help: '@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-help',
                    options: [{
                      value: "",
                      label: "@dmpt-select:Empty"
                    },
                      {
                        label: "@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-collab-space",
                        value: "@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-collab-space"
                      },
                      {
                        label: "@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-survey-platform",
                        value: "@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-survey-platform"
                      },
                      {
                        label: "@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-eresearch-store",
                        value: "@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-eresearch-store"
                      },
                      {
                        label: "@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-eresearch-platforms",
                        value: "@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-eresearch-platforms"
                      },
                      {
                        label: "@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-share-drive",
                        value: "@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-share-drive"
                      },
                      {
                        label: "@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-other",
                        value: "@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-other"
                      }
                    ],
                    required: false,
                    validationMessages: {
                      required: "@dmpt-vivo:Dataset_dc:location_rdf:PlainLiteral-required"
                    }
                  }
                },
                {
                  class: 'TextArea',
                  compClass: 'TextAreaComponent',
                  definition: {
                    name: 'vivo:Dataset_dc:location_skos:note',
                    label: '@dmpt-vivo:Dataset_dc:location_skos:note',
                    rows: 5,
                    columns: 10
                  }
                },
                {
                  /* hide this field
                  class: 'TextArea',
                  compClass: 'TextAreaComponent',*/
                  class: 'HiddenValue',
                  compClass: 'HiddenValueComponent',
                  definition: {
                    name: 'vivo:Dataset_redbox:DataCollectionResources',
                    label: '@dmpt-vivo:Dataset_redbox:DataCollectionResources',
                    help: '@dmpt-vivo:Dataset_redbox:DataCollectionResources-help',
                    rows: 5,
                    columns: 10
                  }
                },
                {
                  /* hide this field
                  class: 'TextArea',
                  compClass: 'TextAreaComponent',*/
                  class: 'HiddenValue',
                  compClass: 'HiddenValueComponent',
                  definition: {
                    name: 'vivo:Dataset_redbox:DataAnalysisResources',
                    label: '@dmpt-vivo:Dataset_redbox:DataAnalysisResources',
                    help: '@dmpt-vivo:Dataset_redbox:DataAnalysisResources-help',
                    rows: 5,
                    columns: 10
                  }
                },
                {
                  /* hide this field
                  class: 'TextArea',
                  compClass: 'TextAreaComponent',*/
                  class: 'HiddenValue',
                  compClass: 'HiddenValueComponent',
                  definition: {
                    name: 'vivo:Dataset_redbox:MetadataStandard',
                    label: '@dmpt-vivo:Dataset_redbox:MetadataStandard',
                    help: '@dmpt-vivo:Dataset_redbox:MetadataStandard-help',
                    rows: 5,
                    columns: 10
                  }
                },
                {
                  /* hide this field
                  class: 'TextArea',
                  compClass: 'TextAreaComponent',*/
                  class: 'HiddenValue',
                  compClass: 'HiddenValueComponent',
                  definition: {
                    name: 'vivo:Dataset_redbox:DataStructureStandard',
                    label: '@dmpt-vivo:Dataset_redbox:DataStructureStandard',
                    help: '@dmpt-vivo:Dataset_redbox:DataStructureStandard-help',
                    rows: 5,
                    columns: 10
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_data',
                      field: 'human_participant_data_identifiable',
                      fieldValue : 'human_participant_data_identifiable'
                    },
                    name: 'ethics_identifiable_data',
                    label: '@dmpt-ethics:identifiable:data',
                    help: '@dmpt-ethics:identifiable:data:help',
                    type: 'text',
                    subscribe: {
                      'ethics_describe': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_identifiable_data:subscribedto:ethics_describe',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['human_participant_data'],
                          valueFalse: [''],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                          ]
                        }]
                      },
                      'ethics_identifiable': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_identifiable_data:subscribedto:ethics_identifiable',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['yes', 'ethics_identifiable'],
                          valueFalse: ['no','ethics_identifiable_no'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                            {key: 'required', val: true}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_collection',
                      field: 'human_participant_data_identifiable',
                      fieldValue : 'human_participant_data_identifiable'
                    },
                    name: 'ethics_identifiable_collection',
                    label: '@dmpt-ethics:identifiable:collection',
                    help: '@dmpt-ethics:identifiable:informed_consent:collection:help',
                    hasValueLabel: '@select-confirm-changes-multivalues',
                    confirmChangesLabel: '@select-confirm-changes',
                    confirmChangesParagraphLabel: '@select-confirm-changes-paragraph',
                    controlType: 'checkbox',
                    options: [{
                      value: "eresearch_store",
                      label: "eResearch Store"
                    },
                      {
                        value: "onedrive",
                        label: "OneDrive"
                      },
                      {
                        value: "redcap",
                        label: "RedCap"
                      },
                      {
                        value: "qualtrics",
                        label: "Qualtrics"
                      },
                      {
                        value: "others",
                        label: "Others",
                        publishTag: 'ethics_identifiable_collection_others',
                        modifies: ['ethics_identifiable_collection_other_text']
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      },
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'ethics_describe': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_identifiable_collection:subscribedto:ethics_describe',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['human_participant_data'],
                          valueFalse: [''],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                          ]
                        }]
                      },
                      'ethics_identifiable': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_identifiable_collection:subscribedto:ethics_identifiable',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['yes', 'ethics_identifiable'],
                          valueFalse: ['no','ethics_identifiable_no'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_collection_other_text',
                      field: 'ethics_identifiable_collection',
                      fieldValue : 'others'
                    },
                    name: 'ethics_identifiable_collection_other_text',
                    label: '@dmpt-ethics:identifiable:collection:other',
                    type: 'text',
                    subscribe: {
                      'ethics_identifiable_collection': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_identifiable_collection_other_text:subscribedto:ethics_identifiable_collection_others',
                          action: 'setProp',
                          valueTest: ['ethics_identifiable_collection_others'],
                          valueFalse: ['eresearch_store', 'onedrive', 'redcap', 'qualtrics'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_storage',
                      field: 'human_participant_data_identifiable',
                      fieldValue : 'human_participant_data_identifiable'
                    },
                    name: 'ethics_identifiable_storage',
                    label: '@dmpt-ethics:identifiable:storage',
                    help: '@dmpt-ethics:identifiable:storage:help',
                    hasValueLabel: '@select-confirm-changes-multivalues',
                    confirmChangesLabel: '@select-confirm-changes',
                    confirmChangesParagraphLabel: '@select-confirm-changes-paragraph',
                    controlType: 'checkbox',
                    options: [{
                      value: "eresearch_store",
                      label: "eResearch Store"
                    },
                      {
                        value: "onedrive",
                        label: "OneDrive"
                      },
                      {
                        value: "redcap",
                        label: "RedCap"
                      },
                      {
                        value: "other",
                        label: "Other",
                        publishTag: 'ethics_identifiable_storage_other',
                        modifies: ['ethics_identifiable_storage_other_text']
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      },
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'ethics_describe': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_identifiable_storage:subscribedto:ethics_describe',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['human_participant_data'],
                          valueFalse: [''],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                          ]
                        }]
                      },
                      'ethics_identifiable': {
                        onValueUpdate: [{
                          debug: 'onItemSelect:ethics_identifiable_storage:subscribedto:ethics_identifiable',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['yes', 'ethics_identifiable'],
                          valueFalse: ['no', 'ethics_identifiable_no'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_storage_other_text',
                      field: 'ethics_identifiable_storage',
                      fieldValue : 'other'
                    },
                    name: 'ethics_identifiable_storage_other_text',
                    label: '@dmpt-ethics:identifiable:storage:other',
                    type: 'text',
                    subscribe: {
                      'ethics_identifiable_storage': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_identifiable_storage_other_text:subscribedto:ethics_identifiable_storage',
                          action: 'setProp',
                          valueTest: ['ethics_identifiable_storage_other'],
                          valueFalse: ['eresearch_store', 'onedrive', 'redcap'],
                          props: [
                            {key: 'value', val: ''},
                            {key: 'visible', val: true}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_informed_consent_publish',
                      field: 'human_participant_data_identifiable',
                      fieldValue : 'human_participant_data_identifiable'
                    },
                    name: 'ethics_identifiable_informed_consent_publish',
                    label: '@dmpt-ethics:identifiable:informed_consent:publish',
                    help: '@dmpt-ethics:identifiable:informed_consent:publish:help',
                    controlType: 'radio',
                    options: [{
                      value: "yes",
                      label: "Yes",
                      publishTag: 'human_participant_data_identifiable_open_consent'
                    },
                      {
                        value: "no",
                        label: "No",
                        publishTag: 'human_participant_data_identifiable_informed_consent',
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'ethics_describe': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_identifiable_informed_consent_publish:subscribedto:ethics_describe',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['human_participant_data'],
                          valueFalse: [''],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                          ]
                        }]
                      },
                      'ethics_identifiable': {
                        onValueUpdate: [{
                          debug: 'onItemSelect:ethics_identifiable_informed_consent_publish:subscribedto:ethics_identifiable',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['yes', 'ethics_identifiable'],
                          valueFalse: ['no', 'ethics_identifiable_no'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                            {key: 'required', val: true}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_additional_security',
                      field: 'human_participant_data_identifiable_consent',
                      fieldValue : 'human_participant_data_identifiable_informed_consent'
                    },
                    name: 'ethics_identifiable_additional_security',
                    label: '@dmpt-ethics:identifiable:additional_security',
                    help: '@dmpt-ethics:identifiable:additional_security:help',
                    controlType: 'radio',
                    options: [{
                      value: "physical_lock",
                      label: "Physical Lock",
                      publishTag: 'ethics_identifiable_additional_security'
                    },
                      {
                        value: "encryption",
                        label: "Encryption"
                      },
                      {
                        value: "additional_password",
                        label: "Additional Password (other than authentication)"
                      }
                    ],
                    subscribe: {
                      'ethics_identifiable': {
                        onValueUpdate: [{
                          debug: 'onItemSelect:ethics_identifiable_additional_security:subscribedto:ethics_identifiable',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['yes', 'ethics_identifiable'],
                          valueFalse: ['no', 'ethics_identifiable_no'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_transfered_out',
                      field: 'human_participant_data_identifiable',
                      fieldValue : 'human_participant_data_identifiable'
                    },
                    name: 'ethics_identifiable_transfered_out',
                    label: '@dmpt-ethics:identifiable:transfered_out',
                    hasValueLabel: '@select-confirm-changes-multivalues',
                    confirmChangesLabel: '@select-confirm-changes',
                    confirmChangesParagraphLabel: '@select-confirm-changes-paragraph',
                    help: '@dmpt-ethics:identifiable:transfered_out:help',
                    controlType: 'radio',
                    options: [{
                      value: "yes",
                      label: "Yes",
                      publishTag: 'ethics_identifiable_transfered_yes'
                    },
                      {
                        value: "no",
                        label: "No",
                        publishTag: 'ethics_identifiable_transfered_no',
                        revert: "yes",
                        modifies: ['ethics_identifiable_transfered_out_yes_text']
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'ethics_describe': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_identifiable_transfered_out:subscribedto:ethics_describe',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['human_participant_data'],
                          valueFalse: [''],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                          ]
                        }]
                      },
                      'ethics_identifiable': {
                        onValueUpdate: [{
                          debug: 'onItemSelect:ethics_identifiable_transfered_out:subscribedto:ethics_identifiable',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['yes', 'ethics_identifiable'],
                          valueFalse: ['no', 'ethics_identifiable_no'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                            {key: 'required', val: true}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_transfered_out_yes_text',
                      field: 'ethics_identifiable_transfered_out',
                      fieldValue : 'yes'
                    },
                    name: 'ethics_identifiable_transfered_out_yes_text',
                    label: '@dmpt-ethics:identifiable:transfered_out:yes',
                    help: '@dmpt-ethics:identifiable:transfered_out:yes:help',
                    type: 'text',
                    help: '@dmpt-ethics:identifiable:transfered_out:yes:help',
                    subscribe: {
                      'ethics_identifiable_transfered_out': {
                        onItemSelect: [{
                          debug: 'onItemSelect:ethics_identifiable_transfered_out_yes_text:subscribedto:ethics_identifiable_transfered_out',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['yes', 'ethics_identifiable_transfered_yes'],
                          valueFalse: ['no', 'ethics_identifiable_transfered_no'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_deidentify',
                      field: 'human_participant_data_identifiable',
                      fieldValue : 'human_participant_data_identifiable'
                    },
                    name: 'ethics_identifiable_deidentify',
                    label: '@dmpt-ethics:identifiable:deidentify',
                    help: '@dmpt-ethics:identifiable:deidentify:help',
                    hasValueLabel: '@select-confirm-changes-multivalues',
                    confirmChangesLabel: '@select-confirm-changes',
                    confirmChangesParagraphLabel: '@select-confirm-changes-paragraph',
                    controlType: 'radio',
                    options: [{
                      value: "yes",
                      label: "Yes",
                      publishTag: 'ethics_identifiable_deidentify_yes',
                      revert: "no",
                      modifies:[
                        'ethics_identifiable_deidentify_no_text'
                      ]
                    },
                      {
                        value: "no",
                        label: "No",
                        publishTag: 'ethics_identifiable_deidentify_no',
                        revert: "yes",
                        modifies:[
                          'ethics_identifiable_deidentify_yes_how_when',
                          'ethics_identifiable_deidentify_yes_where'
                        ]
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'ethics_identifiable': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_identifiable_deidentify:subscribedto:ethics_identifiable',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['yes', 'ethics_identifiable'],
                          valueFalse: ['no', 'ethics_identifiable_no'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true},
                            {key: 'required', val: true}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_deidentify_no_text',
                      field: 'ethics_identifiable_deidentify',
                      fieldValue : 'no'
                    },
                    name: 'ethics_identifiable_deidentify_no_text',
                    label: '@dmpt-ethics:identifiable:deidentify_no',
                    type: 'text',
                    subscribe: {
                      'ethics_identifiable_deidentify': {
                        onItemSelect: [{
                          debug: ':onItemSelect:ethics_identifiable_deidentify_no_text:subscribedto:ethics_identifiable_deidentify',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['no', 'ethics_identifiable_deidentify_no'],
                          valueFalse: ['yes', 'ethics_identifiable_deidentify_yes'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_deidentify_yes_how_when',
                      field: 'ethics_identifiable_deidentify',
                      fieldValue : 'yes'
                    },
                    name: 'ethics_identifiable_deidentify_yes_how_when',
                    label: '@dmpt-ethics:identifiable:deidentify:yes:how_when',
                    type: 'text',
                    subscribe: {
                      'ethics_identifiable_deidentify': {
                        onItemSelect: [{
                          debug: 'ethics_identifiable_deidentify_yes_how_when',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['yes','ethics_identifiable_deidentify_yes'],
                          valueFalse: ['no', 'ethics_identifiable_deidentify_no'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_identifiable_deidentify_yes_where',
                      field: 'ethics_identifiable_deidentify',
                      fieldValue : 'yes'
                    },
                    name: 'ethics_identifiable_deidentify_yes_where',
                    label: '@dmpt-ethics:identifiable:deidentify:yes:where',
                    help: '@dmpt-ethics:identifiable:deidentify:yes:where:help',
                    type: 'text',
                    subscribe: {
                      'ethics_identifiable_deidentify': {
                        onItemSelect: [{
                          debug: 'ethics_identifiable_deidentify_yes_where',
                          action: 'setProp',
                          defer: true,
                          valueTest: ['yes', 'ethics_identifiable_deidentify_yes'],
                          valueFalse: ['no', 'ethics_identifiable_deidentify_no'],
                          props: [
                            {key: 'value', val: '', clear: true},
                            {key: 'visible', val: true}
                          ]
                        }]
                      }
                    }
                  }
                },
                //Removed it since it is in the same tab// {
                //   class: 'Container',
                //   compClass: 'TextBlockComponent',
                //   visible: true,
                //   visibilityCriteria: {
                //     type: 'function',
                //     action: 'updateVisibility',
                //     debug: 'ethics_identifiable_de_identify_non_personal_stored_on_workspaces',
                //     field: 'human_participant_data',
                //     fieldValue : 'human_participant_data'
                //   },
                //   definition: {
                //     value: '@dmpt-ethics:identifiable:de_identify_non_personal:stored_on_workspaces',
                //     type: 'h5'
                //   }
                // }
              ]
            }
          },
          // -------------------------------------------------------------------
          // New Retention and disposal Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "retention",
              label: "@dmpt-retention-tab",
              fields: [{
                class: 'Container',
                compClass: 'TextBlockComponent',
                definition: {
                  value: '@dmpt-retention-heading',
                  type: 'h3'
                }
              },
                {
                  class: 'SelectionField',
                  compClass: 'DropdownFieldComponent',
                  definition: {
                    name: 'redbox:retentionPeriod_dc:date',
                    label: '@dmpt-redbox:retentionPeriod_dc:date',
                    help: '@dmpt-redbox:retentionPeriod_dc:date:help',
                    options: [{
                      value: "",
                      label: "@dmpt-select:Empty"
                    },
                      {
                        value: "1year",
                        label: "@dmpt-redbox:retentionPeriod_dc:date-1year"
                      },
                      {
                        value: "5years",
                        label: "@dmpt-redbox:retentionPeriod_dc:date-5years"
                      },
                      {
                        value: "7years",
                        label: "@dmpt-redbox:retentionPeriod_dc:date-7years"
                      },
                      {
                        value: "15years",
                        label: "@dmpt-redbox:retentionPeriod_dc:date-15years"
                      },
                      {
                        value: "25years",
                        label: "@dmpt-redbox:retentionPeriod_dc:date-25years"
                      },
                      {
                        value: "permanent",
                        label: "@dmpt-redbox:retentionPeriod_dc:date-permanent"
                      }
                    ],
                    required: true,
                    validationMessages: {
                      required: "@dmpt-redbox:retentionPeriod_dc:date-required"
                    }
                  }
                },
                {
                  /* hide this field
                  class: 'SelectionField',
                  compClass: 'DropdownFieldComponent',*/
                  class: 'HiddenValue',
                  compClass: 'HiddenValueComponent',
                  definition: {
                    name: 'redbox:retentionPeriod_dc:date_skos:note',
                    label: '@dmpt-redbox:retentionPeriod_dc:date_skos:note',
                    options: [{
                      value: "",
                      label: "@dmpt-select:Empty"
                    },
                      {
                        value: "heritage",
                        label: "@dmpt-redbox:retentionPeriod_dc:date_skos:note-heritage"
                      },
                      {
                        value: "controversial",
                        label: "@dmpt-redbox:retentionPeriod_dc:date_skos:note-controversial"
                      },
                      {
                        value: "ofinterest",
                        label: "@dmpt-redbox:retentionPeriod_dc:date_skos:note-ofinterest"
                      },
                      {
                        value: "costly_impossible",
                        label: "@dmpt-redbox:retentionPeriod_dc:date_skos:note-costly_impossible"
                      },
                      {
                        value: "commercial",
                        label: "@dmpt-redbox:retentionPeriod_dc:date_skos:note-commercial"
                      }
                    ]
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    name: 'dataowner_name',
                    label: '@dmpt-dataRetention_data_owner',
                    help: '@dmpt-dataRetention_data_owner:help',
                    type: 'text',
                    readOnly: true,
                    subscribe: {
                      'contributor_ci': {
                        onValueUpdate: [{
                          action: 'utilityService.concatenate',
                          fields: ['text_full_name'],
                          delim: ''
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'HiddenValue',
                  compClass: 'HiddenValueComponent',
                  definition: {
                    name: 'dataowner_email',
                    subscribe: {
                      'contributor_ci': {
                        onValueUpdate: [{
                          action: 'utilityService.concatenate',
                          fields: ['email'],
                          delim: ''
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    name: 'dataLicensingAccess_manager',
                    label: '@dmpt-dataLicensingAccess_manager',
                    help: '@dmpt-dataLicensingAccess_manager:help',
                    type: 'text',
                    readOnly: true,
                    subscribe: {
                      'contributor_data_manager': {
                        onValueUpdate: [{
                          action: 'utilityService.concatenate',
                          fields: ['text_full_name'],
                          delim: ''
                        }]
                      }
                    },
                    value: '@user_name'
                  },
                  variableSubstitutionFields: ['value']
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    visible: true,
                    required: true,
                    name: 'ethics_data_destroy_after_retention',
                    label: '@dmpt-ethics:data:destroy_after_retention',
                    //defaultValue: 'yes',
                    controlType: 'radio',
                    options: [{
                      value: "yes",
                      label: "Yes",
                      publishTag: 'ethics_data_destroy_after_retention_yes'
                    },
                      {
                        value: "no",
                        label: "No",
                        publishTag: 'ethics_data_destroy_after_retention_no',
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_data_destroy_after_retention_what',
                      field: 'ethics_data_destroy_after_retention',
                      fieldValue : 'yes'
                    },
                    name: 'ethics_data_destroy_after_retention_what',
                    label: '@dmpt-ethics:data:destroy_after_retention:what',
                    type: 'text',
                    subscribe: {
                      'ethics_data_destroy_after_retention': {
                        onItemSelect: [{
                          debug: 'ethics_data_destroy_after_retention_what',
                          action: 'setProp',
                          valueTest: ['ethics_data_destroy_after_retention_yes'],
                          valueFalse: 'no',
                          props: [
                            {key: 'value', val: ''},
                            {key: 'visible', val: true},
                            {key: 'required', val: true,}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'DateTime',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_data_destroy_after_retention_when',
                      field: 'ethics_data_destroy_after_retention',
                      fieldValue : 'yes'
                    },
                    name: "ethics_data_destroy_after_retention_when",
                    label: "@dmpt-ethics:data:destroy_after_retention:when",
                    help: '@dmpt-ethics:data:destroy_after_retention:when:help',
                    datePickerOpts: {
                      format: 'dd/mm/yyyy',
                      startView: 2,
                      icon: 'fa fa-calendar',
                      autoclose: true
                    },
                    timePickerOpts: false,
                    hasClearButton: false,
                    valueFormat: 'YYYY-MM-DD',
                    displayFormat: 'DD/MM/YYYY',
                    publish: {
                      onValueUpdate: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      title: {
                        onItemSelect: [
                          {
                            action: 'reset'
                          },
                          {
                            action: 'utilityService.convertToDateFormat',
                            field: 'startDate',
                            delim: ',',
                            formatOrigin: 'DD-MMM-YY',
                            formatTarget: 'YYYY-MM-DD'
                          }
                        ]
                      },
                      'ethics_data_destroy_after_retention': {
                        onItemSelect: [{
                          debug: 'ethics_data_destroy_after_retention_when:subscribedto:ethics_data_destroy_after_retention',
                          action: 'setProp',
                          valueTest: ['ethics_data_destroy_after_retention_yes'],
                          valueFalse: 'no',
                          props: [
                            {key: 'value', val: null},
                            {key: 'visible', val: true},
                            {key: 'required', val: true}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    required: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'dmpt_ethics_dc_access_rights_data_retained_secondary',
                      field: 'human_participant_data_identifiable_consent',
                      fieldValue : 'human_participant_data_identifiable_informed_consent'
                    },
                    name: 'dmpt_ethics_dc_access_rights_data_retained_secondary',
                    label: '@dmpt-dc:accessRights:data_retained_secondary',
                    help: '@dmpt-dc:accessRights:data_retained_secondary:help',
                    defaultValue: 'no',
                    controlType: 'radio',
                    options: [{
                      value: "extended_consent",
                      label: "@dmpt-dc:accessRights:data_retained_secondary:extended_consent"
                    },
                      {
                        value: "unspecified_consent",
                        label: "@dmpt-dc:accessRights:data_retained_secondary:unspecified_consent"
                      }
                    ],
                    subscribe: {
                      'human_participant_data_identifiable': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:human_participant_data_identifiable:subscribedto:dmpt_ethics_dc_access_rights_share_data',
                          action: 'setProp',
                          valueTest: ['human_participant_data_identifiable'],
                          valueFalse: '',
                          props: [
                            {key: 'value', val: ''},
                            {key: 'visible', val: true}
                          ]
                        }]
                      }
                    }
                  }
                }
              ]
            }
          },
          // -------------------------------------------------------------------
          // New Access And Rights Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "ownership",
              label: "@dmpt-access-rights-tab",
              fields: [{
                class: 'Container',
                compClass: 'TextBlockComponent',
                definition: {
                  value: '@dmpt-access-rights-heading',
                  type: 'h3'
                }
              },
                {
                  class: 'SelectionField',
                  compClass: 'DropdownFieldComponent',
                  variableSubstitutionFields: ['selectFor'],
                  definition: {
                    selectFor: '@user_edupersonscopedaffiliation',
                    defaultSelect: 'staff@uts.edu.au',
                    name: 'dc:rightsHolder_dc:name',
                    label: '@dmpt-dc:rightsHolder_dc:name',
                    help: [{
                      key: 'staff@uts.edu.au',
                      value: '@dmpt-dc:rightsHolder_dc:name-help'
                    },{
                      key: 'student@uts.edu.au',
                      value: '@dmpt-dc:rightsHolder_dc:name-student-help'
                    }],
                    options: [
                      {
                        key: 'student@uts.edu.au',
                        value:[{
                          value: "", label: "@dmpt-select:Empty"
                        },{
                          value: "myUni", label: "@dmpt-dc:rightsHolder_dc:name-myUni"
                        },{
                          value: "myUnjount", label: "@dmpt-dc:rightsHolder_dc:name-myUnjount"
                        },{
                          value: "student", label: "@dmpt-dc:rightsHolder_dc:name-student"
                        },{
                          value: "studentJoint", label: "@dmpt-dc:rightsHolder_dc:name-studentJoint"
                        },{
                          value: "others", label: "@dmpt-dc:rightsHolder_dc:name-others"
                        }
                        ]
                      },
                      {
                        key: 'staff@uts.edu.au',
                        value:[{
                          value: "", label: "@dmpt-select:Empty"
                        },{
                          value: "myUni", label: "@dmpt-dc:rightsHolder_dc:name-myUni"
                        },{
                          value: "myUnjount", label: "@dmpt-dc:rightsHolder_dc:name-myUnjount"
                        },{
                          value: "student", label: "@dmpt-dc:rightsHolder_dc:name-student"
                        },{
                          value: "others", label: "@dmpt-dc:rightsHolder_dc:name-others"
                        }
                        ]
                      }
                    ],
                    required: true,
                    validationMessages: {
                      required: "@dmpt-dc:rightsHolder_dc:name-required"
                    }
                  }
                },
                {
                  class: 'TextArea',
                  compClass: 'TextAreaComponent',
                  definition: {
                    name: 'dc:rightsHolder_dc:description',
                    label: '@dmpt-dc:rightsHolder_dc:description',
                    help: '@dmpt-dc:rightsHolder_dc:description-help',
                    rows: 5,
                    columns: 10
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    required: true,
                    name: 'dc:accessRights',
                    label: '@dmpt-dc:accessRights',
                    help: '@dmpt-dc:accessRights-help',
                    controlType: 'radio',
                    options: [{
                      value: "@dmpt-dc:accessRights-manager",
                      label: "@dmpt-dc:accessRights-manager",
                      publishTag: 'dc_access_rights_available'
                    },
                      {
                        value: "@dmpt-dc:accessRights-open",
                        label: "@dmpt-dc:accessRights-open",
                        publishTag: 'dc_access_rights_available'
                      },
                      {
                        value: "@dmpt-dc:accessRights-none-val",
                        label: "@dmpt-dc:accessRights-none",
                        publishTag: 'dc_access_rights_not_available',
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'dmpt_ethics_dc_access_rights_not_available',
                      field: 'dc:accessRights',
                      fieldValue : 'not available due to sensitivities'
                    },
                    name: 'dmpt_ethics_dc_access_rights_not_available',
                    label: '@dmpt-dc:accessRights:not_available',
                    type: 'text',
                    subscribe: {
                      'dc:accessRights': {
                        onItemSelect: [{
                          debug: 'dmpt_ethics_dc_access_rights_not_available',
                          action: 'setProp',
                          valueTest: ['dc_access_rights_not_available'],
                          valueFalse: ['Mediated, by permission from the data manager','Open access under license'],
                          props: [
                            {key: 'value', val: ''},
                            {key: 'visible', val: true}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_indigenous_data_ownership',
                      field: 'indigenous_cultural_intelectual_property',
                      fieldValue : 'indigenous_cultural_intelectual_property'
                    },
                    name: 'ethics_indigenous_data_ownership',
                    label: '@dmpt-ethics:data:indigenous:data_ownership',
                    help: '@dmpt-ethics:data:indigenous:data_ownership:help',
                    type: 'text',
                    subscribe: {
                      'indigenous_cultural_intelectual_property': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_indigenous_data_ownership:subscribedto:indigenous_cultural_intelectual_property',
                          action: 'setProp',
                          valueTest: ['indigenous_cultural_intelectual_property'],
                          valueFalse: '',
                          props: [
                            {key: 'value', val: ''},
                            {key: 'visible', val: true},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_indigenous_data_access',
                      field: 'indigenous_cultural_intelectual_property',
                      fieldValue : 'indigenous_cultural_intelectual_property'
                    },
                    name: 'ethics_indigenous_data_access',
                    label: '@dmpt-ethics:data:indigenous:data_access',
                    type: 'text',
                    subscribe: {
                      'indigenous_cultural_intelectual_property': {
                        onValueUpdate: [{
                          debug: 'onValueUpdate:ethics_indigenous_data_access:subscribedto:indigenous_cultural_intelectual_property',
                          action: 'setProp',
                          valueTest: ['indigenous_cultural_intelectual_property'],
                          valueFalse: '',
                          props: [
                            {key: 'value', val: ''},
                            {key: 'visible', val: true},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    visible: true,
                    required: true,
                    name: 'ethics_data_secondary_third_party',
                    label: '@dmpt-ethics:data:secondary_third_party',
                    help: '@dmpt-ethics:identifiable:secondary_third_party:help',
                    defaultValue: 'no',
                    controlType: 'radio',
                    options: [{
                      value: "no",
                      label: "No",
                      publishTag: 'ethics_data_secondary_third_party_no',
                    },
                      {
                        value: "yes",
                        label: "Yes",
                        publishTag: 'ethics_data_secondary_third_party_yes'
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_data_secondary_third_party_held',
                      field: 'ethics_data_secondary_third_party',
                      fieldValue : 'yes'
                    },
                    name: 'ethics_data_secondary_third_party_held',
                    label: '@dmpt-ethics:data:secondary_third_party:held',
                    help: '@dmpt-ethics:data:secondary_third_party:held:help',
                    controlType: 'checkbox',
                    options: [{
                      value: "privately_held",
                      label: "@dmpt-ethics:data:secondary_third_party:held:privately"
                    },
                      {
                        value: "publicly_available",
                        label: "@dmpt-ethics:data:secondary_third_party:held:publicly_available"
                      },
                      {
                        value: "publicly_held_commonwealth",
                        label: "@dmpt-ethics:data:secondary_third_party:held:publicly_held_commonwealth"
                      },
                      {
                        value: "publicly_held_state",
                        label: "@dmpt-ethics:data:secondary_third_party:held:publicly_held_state"
                      },
                      {
                        value: "publicly_held_international",
                        label: "@dmpt-ethics:data:secondary_third_party:held:publicly_held_international"
                      }
                    ],
                    subscribe:{
                      'ethics_data_secondary_third_party': {
                        onItemSelect: [{
                          debug: 'ethics_data_secondary_third_party_held',
                          action: 'setProp',
                          valueTest: ['ethics_data_secondary_third_party_yes'],
                          valueFalse: 'no',
                          props: [
                            {key: 'value', val: ''},
                            {key: 'visible', val: true},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'SelectionField',
                  compClass: 'SelectionFieldComponent',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_data_secondary_third_party_ownership_type',
                      field: 'ethics_data_secondary_third_party',
                      fieldValue : 'yes'
                    },
                    name: 'ethics_data_secondary_third_party_ownership_type',
                    label: '@dmpt-ethics:data:secondary_third_party:ownership_type',
                    help: '@dmpt-ethics:data:secondary_third_party:ownership_type:help',
                    controlType: 'radio',
                    options: [{
                        value: "open_licence",
                        label: "Open licence"
                      },
                      {
                        value: "commercial_licence",
                        label: "Commercial licence"
                      },
                      {
                        value: "purchase",
                        label: "Purchase"
                      },
                      {
                        value: "research_project_agreement_contract",
                        label: "Research project agreement/ contract"
                      },
                      {
                        value: "other",
                        label: "Other, please specify",
                        publishTag: 'ethics_data_secondary_third_party_ownership_type_other'
                      }
                    ],
                    publish: {
                      onItemSelect: {
                        modelEventSource: 'valueChanges'
                      }
                    },
                    subscribe: {
                      'ethics_data_secondary_third_party': {
                        onItemSelect: [{
                          debug: 'ethics_data_secondary_third_party_ownership_type',
                          action: 'setProp',
                          valueTest: ['ethics_data_secondary_third_party_yes'],
                          valueFalse: 'no',
                          props: [
                            {key: 'value', val: '', val2: ''},
                            {key: 'visible', val: true, val2: false},
                            {key: 'required', val: true, val2: false}
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_data_secondary_third_party_ownership_type_other',
                      field: 'ethics_data_secondary_third_party_ownership_type',
                      fieldValue : 'other'
                    },
                    name: 'ethics_data_secondary_third_party_ownership_type_other',
                    label: '@dmpt-ethics:data:secondary_third_party:ownership:other',
                    type: 'text',
                    subscribe: {
                      'ethics_data_secondary_third_party_ownership_type': {
                        onItemSelect: [{
                          debug: 'ethics_data_secondary_third_party_ownership_type_other',
                          action: 'setProp',
                          valueTest: ['ethics_data_secondary_third_party_ownership_type_other'],
                          valueFalse: ['open_license','commercial_license','purchase','research_project_agreement_contract'],
                          props: [
                            {key: 'value', val: ''},
                            {key: 'visible', val: true},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_data_secondary_third_party_security',
                      field: 'ethics_data_secondary_third_party',
                      fieldValue : 'yes'
                    },
                    name: 'ethics_data_secondary_third_party_security',
                    label: '@dmpt-ethics:data:secondary_third_party:security',
                    type: 'text',
                    subscribe: {
                      'ethics_data_secondary_third_party': {
                        onItemSelect: [{
                          debug: 'ethics_data_secondary_third_party_security',
                          action: 'setProp',
                          valueTest: ['ethics_data_secondary_third_party_yes'],
                          valueFalse: 'no',
                          props: [
                            {key: 'value', val: '', val2: ''},
                            {key: 'visible', val: true, val2: false},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_data_secondary_third_party_disposal',
                      field: 'ethics_data_secondary_third_party',
                      fieldValue : 'yes'
                    },
                    name: 'ethics_data_secondary_third_party_disposal',
                    label: '@dmpt-ethics:data:secondary_third_party:disposal',
                    type: 'text',
                    subscribe: {
                      'ethics_data_secondary_third_party': {
                        onItemSelect: [{
                          debug: 'ethics_data_secondary_third_party_disposal',
                          action: 'setProp',
                          valueTest: ['ethics_data_secondary_third_party_yes'],
                          valueFalse: 'no',
                          props: [
                            {key: 'value', val: '', val2: ''},
                            {key: 'visible', val: true, val2: false},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_data_secondary_third_party_attribution',
                      field: 'ethics_data_secondary_third_party',
                      fieldValue : 'yes'
                    },
                    name: 'ethics_data_secondary_third_party_attribution',
                    label: '@dmpt-ethics:data:secondary_third_party:attribution',
                    type: 'text',
                    subscribe: {
                      'ethics_data_secondary_third_party': {
                        onItemSelect: [{
                          debug: 'ethics_data_secondary_third_party_attribution',
                          action: 'setProp',
                          valueTest: ['ethics_data_secondary_third_party_yes'],
                          valueFalse: 'no',
                          props: [
                            {key: 'value', val: '', val2: ''},
                            {key: 'visible', val: true, val2: false},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_data_secondary_third_party_access_arrangements',
                      field: 'ethics_data_secondary_third_party',
                      fieldValue : 'yes'
                    },
                    name: 'ethics_data_secondary_third_party_access_arrangements',
                    label: '@dmpt-ethics:data:secondary_third_party:access_arrangements',
                    type: 'text',
                    subscribe: {
                      'ethics_data_secondary_third_party': {
                        onItemSelect: [{
                          debug: 'ethics_data_secondary_third_party_access_arrangements',
                          action: 'setProp',
                          valueTest: ['ethics_data_secondary_third_party_yes'],
                          valueFalse: 'no',
                          props: [
                            {key: 'value', val: '', val2: ''},
                            {key: 'visible', val: true, val2: false},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'TextField',
                  definition: {
                    visible: false,
                    visibilityCriteria: {
                      type: 'function',
                      action: 'updateVisibility',
                      debug: 'ethics_data_secondary_third_party_other',
                      field: 'ethics_data_secondary_third_party',
                      fieldValue : 'yes'
                    },
                    name: 'ethics_data_secondary_third_party_other',
                    label: '@dmpt-ethics:data:secondary_third_party:other',
                    type: 'text',
                    subscribe: {
                      'ethics_data_secondary_third_party': {
                        onItemSelect: [{
                          debug: 'ethics_data_secondary_third_party_other',
                          action: 'setProp',
                          valueTest: ['ethics_data_secondary_third_party_yes'],
                          valueFalse: 'no',
                          props: [
                            {key: 'value', val: '', val2: ''},
                            {key: 'visible', val: true, val2: false},
                          ]
                        }]
                      }
                    }
                  }
                },
                {
                  class: 'HtmlRaw',
                  compClass: 'HtmlRawComponent',
                  editOnly: true,
                  definition: {
                    name: "attach-licences-prefix",
                    value: '<h5>Please attach ethics approvals, licences or agreements if applicable after you have saved your plan</h5>'
                  }
                },
                {
                  class: 'RelatedFileUpload',
                  compClass: 'RelatedFileUploadComponent',
                  definition: {
                    name: "licences_agreements",
                    maxFileSize: 1073741824, // <- Configure web server to match this
                    maxNumberOfFiles: 50,
                    notesEnabled: true,
                    locationHeader: 'Files associated with this plan',
                    notesHeader: '@dataLocations-notes',
                    uppyDashboardNote: '@dataLocations-uploader-note',
                    attachmentText: 'Attach files',
                    attachmentTextDisabled: 'Save your plan to attach files',
                    help: 'Upload your licence or agreements here by clicking the button. You can only upload after you save your plan.',
                    label: 'Licences or Agreements:'
                  }
                }
              ]
            }
          },

          // -------------------------------------------------------------------
          // Workspaces Tab
          // -------------------------------------------------------------------
          {
            class: "Container",
            definition: {
              id: "workspaces",
              label: "@dmpt-workspaces-tab",
              fields: [{
                class: 'Container',
                compClass: 'TextBlockComponent',
                definition: {
                  value: '@dmpt-workspaces-heading',
                  type: 'h3'
                }
              },
                {
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  definition: {
                    value: '@dmpt-workspaces-associated-heading',
                    type: 'h4',
                    help: 'This table represents the workspaces associated with this data management plan. Click the <i aria-hidden="true" class="fa fa-pencil"></i>&nbsp;edit button to edit or remove them from your plan',
                  }
                },
                {
                  class: 'RelatedObjectDataField',
                  showHeader: true,
                  definition: {
                    name: 'workspaces',
                    arhiveConfirmMessage: 'will be removed from the data management plan',
                    confirmArchiveTitle: 'Confirm Archive',
                    isEditable: true,
                    columns: [{
                        "label": "Name",
                        "property": "title",
                        "isEditable": true,
                        "cssClasses": "col-md-3"
                      },
                      {
                        "label": "Description",
                        "property": "description",
                        "isEditable": true,
                        "cssClasses": "col-md-3"
                      },
                      {
                        "label": "Location",
                        "property": "location",
                        "link": "absolute",
                        "isEditable": true,
                        "cssClasses": "col-md-3"
                      },
                      {
                        "label": "Workspace",
                        "property": "subtype",
                        "cssClasses": "col-md-1"
                      },
                      {
                        "label": "Type",
                        "property": "type",
                        "cssClasses": "col-md-1"
                      }
                    ]
                  }
                },
                {
                  class: 'WorkspaceRegisterField',
                  compClass: 'WorkspaceRegisterFieldComponent',
                  definition: {
                    value: '@dmpt-workspaces-associated-heading',
                    open: 'Register Research Workspace',
                    saveFirst: 'Save your plan to register a workspace',
                    type: 'h4',
                    workspaceApps: [
                      {label: "eResearch Store", value: "research-workspace-eresearch-store", description: 'Storage provided by eResearch', image: 'https://stash-uat.research.uts.edu.au/angular/catalog/assets/images/storage.png'},
                      {label: "OneDrive", value: "research-workspace-onedrive", keywords:'microsoft storage', description: 'Store and share photos, videos, documents', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Microsoft_Office_OneDrive_%282018%E2%80%93present%29.svg'},
                      {label: "Cloudstor", value: "research-workspace-cloudstor", keywords: 'cloudstor storage', description: 'Cloud service for researchers. With CloudStor researchers can easily sync, share and store files using the high-speed AARNet network', image: '/angular/assets/images/cloudstor.png'},
                      {label: "University Drive", value: "research-workspace-university-drive", keywords:'uts storage', description: 'G:/ or H:// drive provided by UTS', image: 'https://www.lib.uts.edu.au/sites/all/themes/utslib2011/images/logos/UTS_logo_web.svg'},
                      {label: "Qualtrics", value: "research-workspace-eresearch-qualtrics", keywords:'survey', description: 'Build surveys, distribute surveys and analyze responses ', image: 'https://www.qualtrics.com/m/qualtrics-xm-long.svg'},
                      {label: "eResearch LimeSurvey", value: "research-workspace-eresearch-limesurvey", keywords:'survey', description: 'Online survey tool that allows one to build surveys, distribute surveys and analyze responses ', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Limesurvey_logo.png'},
                      {label: "HPCC", value: "research-workspace-eresearch-hpcc", keywords:'High Performance Computer Cluster', description: 'High Performance Computing Cluster (HPCC) that can be accessed by UTS researchers.', image: 'https://stash-uat.research.uts.edu.au/angular/catalog/assets/images/uts_hpcc.png'},
                      {label: "iHPCC", value: "research-workspace-eresearch-ihpc", keywords: 'Interactive High Performance Computer', description: 'The iHPC facility provides an interactive high performance computing resource for all researchers within UTS.', image: 'https://stash-uat.research.uts.edu.au/angular/catalog/assets/images/uts_ihpc.png'},
                      {label: "Git Repository", value: "research-workspace-eresearch-git-repository", keywords: 'github gitlab', description: 'Repositories in GIT contain a collection of files of various different versions of a Project', image: 'https://git-scm.com/images/logo@2x.png'}
                    ]
                  }
                },
                {
                  class: 'Container',
                  compClass: 'TextBlockComponent',
                  editOnly: true,
                  definition: {
                    value: '@dmpt-workspaces-create-title',
                    type: 'h4'
                  }
                },
                {
                  class: 'WorkspaceSelectorField',
                  compClass: 'WorkspaceSelectFieldComponent',
                  definition: {
                    name: 'WorkspaceSelect',
                    label: '@dmpt-workspace-select-type',
                    help: '@dmpt-workspace-select-help',
                    open: '@dmpt-workspace-open',
                    saveFirst: '@dmpt-workspace-saveFirst',
                    defaultSelection: [{
                      name: '',
                      label: '@dmpt-select:Empty'
                    }]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      class: "ButtonBarContainer",
      compClass: "ButtonBarContainerComponent",
      definition: {
        editOnly: true,
        fields: [{
          class: "TabNavButton",
          definition: {
            id: 'mainTabNav',
            prevLabel: "@tab-nav-previous",
            nextLabel: "@tab-nav-next",
            targetTabContainerId: "mainTab",
            cssClasses: 'btn btn-primary',
            endDisplayMode: 'hidden'
          }
        },
          {
            class: "Spacer",
            definition: {
              width: '50px',
              height: 'inherit'
            }
          },
          {
            class: "SaveButton",
            definition: {
              label: 'Save',
              cssClasses: 'btn-success'
            }
          },
          {
            class: "SaveButton",
            definition: {
              label: 'Save & Close',
              closeOnSave: true,
              redirectLocation: '/@branding/@portal/dashboard/rdmp'
            },
            variableSubstitutionFields: ['redirectLocation']
          },
          {
            class: "CancelButton",
            definition: {
              label: 'Close',
            }
          }
        ]
      }
    },
    {
      class: "Container",
      definition: {
        id: "form-render-complete",
        label: "Test",
        fields: [{
          class: 'Container',
          compClass: 'TextBlockComponent',
          definition: {
            value: 'will be empty',
            type: 'span'
          }
        }]
      }
    }
  ]
};
