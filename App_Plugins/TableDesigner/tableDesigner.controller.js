angular.module("umbraco").controller("tableDesignerController", function ($scope, notificationsService, entityResource) {
    console.log(entityResource);
    var vm = $scope;
    vm.defaultColumnTmpl = '<span>[[value]]</span>';
    vm.settings = {
        tableOptions: {
            tableTitle: null,
            "pageSize": 25
        },
        columns: [],
        conditions: []
    };

    vm.column = {
        title: null,
        targets: null,
        tmpl: null
    };

    vm.operators = [
  { name: 'Equal to', operator: '==' },
  { name: 'NOT Equal to', operator: '!=' },
  { name: 'Greater Than', operator: '>' },
  { name: 'Less Than', operator: '<' }
    ];
    if (vm.model.value) {
        vm.settings = vm.model.value;
    }
    vm.condition = {
        selectedOperator: null,
        targets: null,
        result: null,
        value: null
    };
    updateModelValue = function () {
        vm.model.value = JSON.stringify(vm.settings);
    }
    vm.$watch('settings.tableOptions', function (newValue, oldValue) {
        updateModelValue();
    }, true);

    //entityResource.getById(vm.model.value, "table designer").then(function (ent) {
    //    alert(ent);
    //    alert(vm.model.value);
    //});
    vm.addColumn = function ($event) {
        var tmpl = vm.column.tmpl || vm.defaultColumnTmpl;
        if (vm.column.targets) {
            vm.settings.columns.push({ title: vm.column.title || vm.column.targets, targets: vm.column.targets, tmpl: tmpl, op: 'insert' });
            vm.column = null;
        }
        else {
            return alert("target column is required");
        }
        updateModelValue();
    };
    vm.deleteColumn = function ($event, item) {
        vm.settings.columns.splice(vm.settings.columns.indexOf(item), 1);
        updateModelValue();
    }

    vm.deleteCondition = function ($event, item) {
        vm.settings.conditions.splice(vm.settings.conditions.indexOf(item), 1);
        updateModelValue();
    }


    vm.addCondition = function () {
        vm.condition.result = vm.condition.result || vm.defaultColumnTmpl;
        vm.settings.conditions.push(vm.condition);
        vm.condition = null;
        updateModelValue();
    }
});
