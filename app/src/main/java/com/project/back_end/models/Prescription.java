package com.project.back_end.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Document(collection = "prescriptions")
public class Prescription {

    @Id
    private String id;

    @NotNull
    @Size(min = 3, max = 100)
    private String patientName;

    @NotNull
    private Long appointmentId;

    @NotNull
    @Size(min = 3, max = 100)
    private String medication;

    @NotNull
    private String dosage;

    @Size(max = 200)
    private String doctorNotes;

    // No-argument constructor
    public Prescription() {
    }

    // Parameterized constructor
    public Prescription(String patientName, String medication,
                         String dosage, String doctorNotes,
                         Long appointmentId) {
        this.patientName = patientName;
        this.medication = medication;
        this.dosage = dosage;
        this.doctorNotes = doctorNotes;
        this.appointmentId = appointmentId;
    }

    // Getters

    public String getId() {
        return id;
    }

    public String getPatientName() {
        return patientName;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public String getMedication() {
        return medication;
    }

    public String getDosage() {
        return dosage;
    }

    public String getDoctorNotes() {
        return doctorNotes;
    }

    // Setters

    public void setId(String id) {
        this.id = id;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public void setMedication(String medication) {
        this.medication = medication;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public void setDoctorNotes(String doctorNotes) {
        this.doctorNotes = doctorNotes;
    }
}