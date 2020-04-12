const GObject		= imports.gi.GObject;
const Gtk			= imports.gi.Gtk;
const Gio			= imports.gi.Gio;
const Me			= imports.misc.extensionUtils.getCurrentExtension();
const getSettings	= Me.imports.utils.getSettings;

const settingsWidgets = new GObject.Class({
    Name: 'TrayIcons.Settings',
    Extends: Gtk.Grid,

    _init() {
        this.parent();
        this.margin = 24;
        this.spacing = 28;
        this.row_spacing = 16;
		this._settings = getSettings();
		
        let label;
        let widget;

        label = new Gtk.Label({ label: 'Tray position', hexpand: true, halign: Gtk.Align.START });
        widget = new Gtk.ComboBoxText();
        widget.append('left', 'Left');
        widget.append('center', 'Center');
        widget.append('right', 'Right');
        this._settings.bind('tray-position', widget, 'active-id', Gio.SettingsBindFlags.DEFAULT);
        this.attach(label, 0, 0, 1, 1);
        this.attach(widget, 1, 0, 1, 1);

        label = new Gtk.Label({ label: 'Icon size', hexpand: true, halign: Gtk.Align.START });
        widget = new Gtk.SpinButton({halign:Gtk.Align.END});
        widget.set_range(16, 32);
		widget.set_increments(1, 1);
		this._settings.bind('icon-size', widget, 'value', Gio.SettingsBindFlags.DEFAULT);
        this.attach(label, 0, 1, 1, 1);
		this.attach(widget, 1, 1, 1, 1);
		
        label = new Gtk.Label({ label: 'Modify Wine apps behavior', hexpand: true, halign: Gtk.Align.START });
        widget = new Gtk.Switch({halign:Gtk.Align.END});
		this._settings.bind('wine-behavior', widget, 'active', Gio.SettingsBindFlags.DEFAULT);
        this.attach(label, 0, 2, 1, 1);
		this.attach(widget, 1, 2, 1, 1);

		this._footer();
	},
	
	_footer() {
		label = new Gtk.LinkButton({ label: 'GitHub', uri: 'https://github.com/MartinPL/Tray-Icons-Reloaded', hexpand: true, halign: Gtk.Align.CENTER });
        this.attach(label, 0, 3, 2, 1);
	}

});

function buildPrefsWidget() {
    const widgets = new settingsWidgets();
    widgets.show_all();

    return widgets;
}

function init() {}