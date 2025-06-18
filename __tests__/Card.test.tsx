import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "@/components/shared/Card";
import { Rocket } from "lucide-react";
import "@testing-library/jest-dom";

describe("BlogCard", () => {
    it("duhet të shfaqë titullin dhe përmbajtjen e blogut", () => {
        render(
            <Card
                icon={Rocket}
                title="Titulli i Blogut"
                description="Përmbajtja e blogut këtu."
            />
        );

        // Kontrollo që titulli të jetë në dokument
        expect(screen.getByText("Titulli i Blogut")).toBeInTheDocument();
        
        // Kontrollo që përmbajtja të jetë në dokument
        expect(screen.getByText("Përmbajtja e blogut këtu.")).toBeInTheDocument();
    });
});