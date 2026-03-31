import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ContactForm from "./ContactForm";

const mockDict = {
  form_name: "Name",
  form_email: "Email",
  form_message: "Message",
  form_submit: "Send Message",
};

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it("renders correctly", () => {
    render(<ContactForm dict={mockDict} lang="en" />);
    
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByText(/Send Message/i)).toBeInTheDocument();
  });

  it("updates form fields correctly", () => {
    render(<ContactForm dict={mockDict} lang="en" />);
    
    const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/Message/i) as HTMLTextAreaElement;
    
    fireEvent.change(nameInput, { target: { value: "John Doe", name: "name" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com", name: "email" } });
    fireEvent.change(messageInput, { target: { value: "Hello world", name: "message" } });
    
    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(messageInput.value).toBe("Hello world");
  });

  it("handles successful form submission", async () => {
    render(<ContactForm dict={mockDict} lang="en" />);
    
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);
    const submitBtn = screen.getByText(/Send Message/i);
    
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "John Doe", name: "name" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com", name: "email" } });
      fireEvent.change(messageInput, { target: { value: "Hello world", name: "message" } });
    });

    await act(async () => {
      fireEvent.click(submitBtn);
    });
    
    // Should show loading state
    expect(screen.getByText(/Sending.../i)).toBeInTheDocument();
    
    // Fast-forward 2 seconds for the mock API call
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    
    expect(screen.getByText(/Message Sent!/i)).toBeInTheDocument();
    expect(screen.getByText(/We'll get back to you as soon as possible./i)).toBeInTheDocument();
  });

  it("shows Spanish success message", async () => {
    render(<ContactForm dict={mockDict} lang="es" />);
    
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);
    
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Juan", name: "name" } });
      fireEvent.change(emailInput, { target: { value: "juan@example.com", name: "email" } });
      fireEvent.change(messageInput, { target: { value: "Hola", name: "message" } });
    });

    const submitBtn = screen.getByText(/Send Message/i);
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    
    expect(screen.getByText(/¡Mensaje Enviado!/i)).toBeInTheDocument();
    expect(screen.getByText(/Nos pondremos en contacto contigo lo antes posible./i)).toBeInTheDocument();
  });

  it("handles form submission error", async () => {
    render(<ContactForm dict={mockDict} lang="en" />);
    
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);
    const submitBtn = screen.getByText(/Send Message/i);
    
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "TriggerError", name: "name" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com", name: "email" } });
      fireEvent.change(messageInput, { target: { value: "Hello", name: "message" } });
    });

    // Mock console.error to avoid noise in tests
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
      fireEvent.click(submitBtn);
    });
    
    expect(screen.getByText(/Error sending message. Please try again./i)).toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});
