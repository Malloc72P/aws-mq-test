package malloc72p.micomet;

import org.cometd.annotation.server.AnnotationCometDServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletRegistration;
import malloc72p.micomet.test.TestService;
import malloc72p.micomet.test.TestServlet;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:8080")
public class MicometApplication implements ServletContextInitializer{

	public static void main(String[] args) {
		SpringApplication.run(MicometApplication.class, args);
	}

	@Override
    public void onStartup(ServletContext servletContext) {
        ServletRegistration.Dynamic cometdServlet = servletContext.addServlet("cometd", AnnotationCometDServlet.class);
        String mapping = "/cometd/*";
        cometdServlet.addMapping(mapping);
        cometdServlet.setAsyncSupported(true);
        cometdServlet.setLoadOnStartup(1);
        cometdServlet.setInitParameter("services", TestService.class.getName());
        cometdServlet.setInitParameter("ws.cometdURLMapping", mapping);
        // cometdServlet.setInitParameter("timeout", String.valueOf(20));
        cometdServlet.setInitParameter("timeout", String.valueOf(1000 * 60 * 5));

        ServletRegistration.Dynamic testServlet = servletContext.addServlet("micomet", TestServlet.class);
        testServlet.addMapping("/test");
        testServlet.setAsyncSupported(true);
        testServlet.setLoadOnStartup(2);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/cometd/*").allowedOrigins("http://localhost:8080");
			}
		};
	}
}
