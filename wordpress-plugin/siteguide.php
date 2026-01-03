<?php
/**
 * Plugin Name: SiteGuide by aiConnected
 * Plugin URI: https://siteguide.io
 * Description: AI-powered co-browsing assistant that helps visitors navigate your website using natural conversation.
 * Version: 1.0.0
 * Author: aiConnected
 * Author URI: https://aiconnected.ai
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: siteguide
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Plugin constants
define('SITEGUIDE_VERSION', '1.0.0');
define('SITEGUIDE_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SITEGUIDE_PLUGIN_URL', plugin_dir_url(__FILE__));
define('SITEGUIDE_CDN_URL', 'https://cdn.siteguide.io');

/**
 * Main SiteGuide Plugin Class
 */
class SiteGuide {
    /**
     * Instance of this class
     */
    private static $instance = null;

    /**
     * Plugin settings
     */
    private $settings;

    /**
     * Get singleton instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        $this->settings = get_option('siteguide_settings', array());

        // Admin hooks
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));

        // Frontend hooks
        add_action('wp_footer', array($this, 'inject_widget_script'));

        // Activation/deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }

    /**
     * Plugin activation
     */
    public function activate() {
        // Set default options
        $default_settings = array(
            'site_id' => '',
            'enabled' => true,
            'position' => 'bottom-center',
            'theme' => 'dark',
            'voice_enabled' => true,
            'greeting' => 'Hi! How can I help you today?',
            'excluded_pages' => '',
        );

        if (!get_option('siteguide_settings')) {
            add_option('siteguide_settings', $default_settings);
        }
    }

    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Cleanup if needed
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_options_page(
            __('SiteGuide Settings', 'siteguide'),
            __('SiteGuide', 'siteguide'),
            'manage_options',
            'siteguide',
            array($this, 'render_settings_page')
        );
    }

    /**
     * Register plugin settings
     */
    public function register_settings() {
        register_setting('siteguide_settings_group', 'siteguide_settings', array(
            'sanitize_callback' => array($this, 'sanitize_settings'),
        ));

        // Main section
        add_settings_section(
            'siteguide_main_section',
            __('Configuration', 'siteguide'),
            array($this, 'main_section_callback'),
            'siteguide'
        );

        // Site ID field
        add_settings_field(
            'site_id',
            __('Site ID', 'siteguide'),
            array($this, 'site_id_field_callback'),
            'siteguide',
            'siteguide_main_section'
        );

        // Enabled field
        add_settings_field(
            'enabled',
            __('Enable SiteGuide', 'siteguide'),
            array($this, 'enabled_field_callback'),
            'siteguide',
            'siteguide_main_section'
        );

        // Position field
        add_settings_field(
            'position',
            __('Widget Position', 'siteguide'),
            array($this, 'position_field_callback'),
            'siteguide',
            'siteguide_main_section'
        );

        // Theme field
        add_settings_field(
            'theme',
            __('Theme', 'siteguide'),
            array($this, 'theme_field_callback'),
            'siteguide',
            'siteguide_main_section'
        );

        // Voice enabled field
        add_settings_field(
            'voice_enabled',
            __('Voice Mode', 'siteguide'),
            array($this, 'voice_field_callback'),
            'siteguide',
            'siteguide_main_section'
        );

        // Greeting field
        add_settings_field(
            'greeting',
            __('Greeting Message', 'siteguide'),
            array($this, 'greeting_field_callback'),
            'siteguide',
            'siteguide_main_section'
        );

        // Excluded pages field
        add_settings_field(
            'excluded_pages',
            __('Excluded Pages', 'siteguide'),
            array($this, 'excluded_pages_field_callback'),
            'siteguide',
            'siteguide_main_section'
        );
    }

    /**
     * Sanitize settings
     */
    public function sanitize_settings($input) {
        $sanitized = array();

        $sanitized['site_id'] = sanitize_text_field($input['site_id'] ?? '');
        $sanitized['enabled'] = !empty($input['enabled']);
        $sanitized['position'] = sanitize_text_field($input['position'] ?? 'bottom-center');
        $sanitized['theme'] = sanitize_text_field($input['theme'] ?? 'dark');
        $sanitized['voice_enabled'] = !empty($input['voice_enabled']);
        $sanitized['greeting'] = sanitize_text_field($input['greeting'] ?? '');
        $sanitized['excluded_pages'] = sanitize_textarea_field($input['excluded_pages'] ?? '');

        return $sanitized;
    }

    /**
     * Main section callback
     */
    public function main_section_callback() {
        echo '<p>' . esc_html__('Configure your SiteGuide AI assistant settings below.', 'siteguide') . '</p>';
    }

    /**
     * Site ID field
     */
    public function site_id_field_callback() {
        $site_id = $this->settings['site_id'] ?? '';
        echo '<input type="text" name="siteguide_settings[site_id]" value="' . esc_attr($site_id) . '" class="regular-text" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />';
        echo '<p class="description">' . esc_html__('Your unique Site ID from the SiteGuide dashboard.', 'siteguide') . '</p>';
    }

    /**
     * Enabled field
     */
    public function enabled_field_callback() {
        $enabled = $this->settings['enabled'] ?? true;
        echo '<label><input type="checkbox" name="siteguide_settings[enabled]" value="1" ' . checked($enabled, true, false) . ' /> ';
        echo esc_html__('Show SiteGuide widget on your site', 'siteguide') . '</label>';
    }

    /**
     * Position field
     */
    public function position_field_callback() {
        $position = $this->settings['position'] ?? 'bottom-center';
        $options = array(
            'bottom-center' => __('Bottom Center', 'siteguide'),
            'bottom-right' => __('Bottom Right', 'siteguide'),
            'bottom-left' => __('Bottom Left', 'siteguide'),
        );

        echo '<select name="siteguide_settings[position]">';
        foreach ($options as $value => $label) {
            echo '<option value="' . esc_attr($value) . '" ' . selected($position, $value, false) . '>' . esc_html($label) . '</option>';
        }
        echo '</select>';
    }

    /**
     * Theme field
     */
    public function theme_field_callback() {
        $theme = $this->settings['theme'] ?? 'dark';
        $options = array(
            'dark' => __('Dark', 'siteguide'),
            'light' => __('Light', 'siteguide'),
            'auto' => __('Auto (System)', 'siteguide'),
        );

        echo '<select name="siteguide_settings[theme]">';
        foreach ($options as $value => $label) {
            echo '<option value="' . esc_attr($value) . '" ' . selected($theme, $value, false) . '>' . esc_html($label) . '</option>';
        }
        echo '</select>';
    }

    /**
     * Voice field
     */
    public function voice_field_callback() {
        $voice_enabled = $this->settings['voice_enabled'] ?? true;
        echo '<label><input type="checkbox" name="siteguide_settings[voice_enabled]" value="1" ' . checked($voice_enabled, true, false) . ' /> ';
        echo esc_html__('Enable voice input and output', 'siteguide') . '</label>';
    }

    /**
     * Greeting field
     */
    public function greeting_field_callback() {
        $greeting = $this->settings['greeting'] ?? '';
        echo '<input type="text" name="siteguide_settings[greeting]" value="' . esc_attr($greeting) . '" class="large-text" placeholder="Hi! How can I help you today?" />';
        echo '<p class="description">' . esc_html__('Custom greeting message (optional).', 'siteguide') . '</p>';
    }

    /**
     * Excluded pages field
     */
    public function excluded_pages_field_callback() {
        $excluded = $this->settings['excluded_pages'] ?? '';
        echo '<textarea name="siteguide_settings[excluded_pages]" rows="4" class="large-text" placeholder="/checkout&#10;/cart&#10;/admin/*">' . esc_textarea($excluded) . '</textarea>';
        echo '<p class="description">' . esc_html__('Enter page paths to exclude (one per line). Supports wildcards (*).', 'siteguide') . '</p>';
    }

    /**
     * Render settings page
     */
    public function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        // Check for settings update
        if (isset($_GET['settings-updated'])) {
            add_settings_error('siteguide_messages', 'siteguide_message', __('Settings saved.', 'siteguide'), 'updated');
        }

        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>

            <?php settings_errors('siteguide_messages'); ?>

            <div class="siteguide-admin-container">
                <div class="siteguide-admin-main">
                    <form action="options.php" method="post">
                        <?php
                        settings_fields('siteguide_settings_group');
                        do_settings_sections('siteguide');
                        submit_button(__('Save Settings', 'siteguide'));
                        ?>
                    </form>
                </div>

                <div class="siteguide-admin-sidebar">
                    <div class="siteguide-admin-box">
                        <h3><?php esc_html_e('Status', 'siteguide'); ?></h3>
                        <?php if (!empty($this->settings['site_id']) && ($this->settings['enabled'] ?? false)): ?>
                            <p style="color: green;">&#10003; <?php esc_html_e('SiteGuide is active', 'siteguide'); ?></p>
                        <?php elseif (empty($this->settings['site_id'])): ?>
                            <p style="color: orange;">&#9888; <?php esc_html_e('Please enter your Site ID', 'siteguide'); ?></p>
                        <?php else: ?>
                            <p style="color: gray;">&#10005; <?php esc_html_e('SiteGuide is disabled', 'siteguide'); ?></p>
                        <?php endif; ?>
                    </div>

                    <div class="siteguide-admin-box">
                        <h3><?php esc_html_e('Need Help?', 'siteguide'); ?></h3>
                        <p><a href="https://siteguide.io/docs" target="_blank"><?php esc_html_e('Documentation', 'siteguide'); ?></a></p>
                        <p><a href="https://siteguide.io/dashboard" target="_blank"><?php esc_html_e('SiteGuide Dashboard', 'siteguide'); ?></a></p>
                        <p><a href="https://siteguide.io/support" target="_blank"><?php esc_html_e('Contact Support', 'siteguide'); ?></a></p>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * Admin scripts and styles
     */
    public function admin_scripts($hook) {
        if ($hook !== 'settings_page_siteguide') {
            return;
        }

        wp_add_inline_style('wp-admin', '
            .siteguide-admin-container {
                display: flex;
                gap: 20px;
                margin-top: 20px;
            }
            .siteguide-admin-main {
                flex: 1;
                background: #fff;
                padding: 20px;
                border: 1px solid #ccd0d4;
                border-radius: 4px;
            }
            .siteguide-admin-sidebar {
                width: 300px;
            }
            .siteguide-admin-box {
                background: #fff;
                padding: 15px;
                border: 1px solid #ccd0d4;
                border-radius: 4px;
                margin-bottom: 15px;
            }
            .siteguide-admin-box h3 {
                margin-top: 0;
                padding-bottom: 10px;
                border-bottom: 1px solid #eee;
            }
            @media (max-width: 782px) {
                .siteguide-admin-container {
                    flex-direction: column;
                }
                .siteguide-admin-sidebar {
                    width: 100%;
                }
            }
        ');
    }

    /**
     * Check if widget should be shown on current page
     */
    private function should_show_widget() {
        // Check if enabled
        if (empty($this->settings['enabled'])) {
            return false;
        }

        // Check if site ID is set
        if (empty($this->settings['site_id'])) {
            return false;
        }

        // Don't show in admin
        if (is_admin()) {
            return false;
        }

        // Check excluded pages
        $excluded = $this->settings['excluded_pages'] ?? '';
        if (!empty($excluded)) {
            $current_path = wp_parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            $excluded_paths = array_filter(array_map('trim', explode("\n", $excluded)));

            foreach ($excluded_paths as $pattern) {
                // Convert wildcard pattern to regex
                $regex = '/^' . str_replace('\*', '.*', preg_quote($pattern, '/')) . '$/';
                if (preg_match($regex, $current_path)) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Inject widget script in footer
     */
    public function inject_widget_script() {
        if (!$this->should_show_widget()) {
            return;
        }

        $site_id = esc_attr($this->settings['site_id']);
        $position = esc_attr($this->settings['position'] ?? 'bottom-center');
        $theme = esc_attr($this->settings['theme'] ?? 'dark');
        $voice = ($this->settings['voice_enabled'] ?? true) ? 'true' : 'false';
        $greeting = esc_attr($this->settings['greeting'] ?? '');

        $cdn_url = SITEGUIDE_CDN_URL;

        ?>
        <!-- SiteGuide by aiConnected -->
        <script
            defer
            src="<?php echo esc_url($cdn_url . '/siteguide.js'); ?>"
            data-site-id="<?php echo $site_id; ?>"
            data-position="<?php echo $position; ?>"
            data-theme="<?php echo $theme; ?>"
            data-voice="<?php echo $voice; ?>"
            <?php if ($greeting): ?>data-greeting="<?php echo $greeting; ?>"<?php endif; ?>
        ></script>
        <?php
    }
}

// Initialize the plugin
SiteGuide::get_instance();
