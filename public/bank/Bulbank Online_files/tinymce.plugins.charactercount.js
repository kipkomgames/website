tinymce.PluginManager.add('charactercount', function (editor) {
    var self = this;

    function update() {
        editor.theme.panel.find('#charactercount').text([tinymce.translate("Characters: {0}"), self.getCount()]);
    }

    editor.on('init', function () {
        var statusbar = editor.theme.panel && editor.theme.panel.find('#statusbar')[0];

        if (statusbar) {
            window.setTimeout(function () {
                statusbar.insert({
                    type: 'label',
                    name: 'charactercount',
                    text: [tinymce.translate("Characters: {0}"), self.getCount()],
                    classes: 'charactercount',
                    disabled: editor.settings.readonly
                }, 0);

                editor.on('setcontent beforeaddundo', update);

                editor.on('keyup', function (e) {
                    update();
                });
            }, 0);
        }
    });

    self.getCount = function () {
        var count = editor.getContent().length;
        return count;
    };
});