# Docker Installation on Windows

This document guides you through the process of installing Docker Desktop on a Windows machine using WSL 2. Follow the steps below to install, verify, and start using Docker.

## What is Docker?

Docker is a platform designed to help develop, ship, and run applications inside lightweight, portable containers. Containers package application's code along with its dependencies, ensuring that it runs quickly and reliably in different computing environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
- [Post-Installation Verification](#post-installation-verification)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources)

## Prerequisites

- **Operating System:** Windows 10 64-bit: Home, Pro, Enterprise, or Education (Build 19041 or later) or Windows 11.
- **Hardware:**
  - 4GB RAM minimum (8GB or more recommended)
  - Virtualization enabled in your system's BIOS/UEFI settings.
- **Software:**
  - **WSL 2:** Docker Desktop leverages the Windows Subsystem for Linux 2 (WSL 2). If not already installed, the Docker Desktop installer will guide you through the setup.

## Installation Steps

1. **Download Docker Desktop:**

   - Visit the [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) download page.
   - Click on **Download for Windows** to get the latest installer.

2. **Run the Installer:**

   - Locate the downloaded installer file (typically `Docker Desktop Installer.exe`).
   - Double-click the installer to run it.
   - Follow the installation wizard instructions.
   - **Note:** If you encounter any prompts regarding the installation of WSL 2, follow the on-screen instructions to enable it.

3. **Configure Docker Desktop:**
   - Once installation is complete, launch Docker Desktop.
   - You might be prompted to log in with a Docker Hub account. You can create one for free if you don’t have it, or skip the sign-in step.
   - Docker Desktop may ask for permission to enable WSL 2 features. Confirm these prompts.

## Post-Installation Verification

1. **Verify Installation via Docker Desktop:**

   - Open Docker Desktop from the Start Menu.
   - Ensure that the Docker icon in the system tray indicates that Docker is running.

2. **Verify via Command Line:**

   - Open **Command Prompt** or **PowerShell**.
   - Type the following command and press **Enter**:
     ```bash
     docker --version
     ```
   - You should see the Docker version information, indicating that Docker is installed correctly.

3. **Run a Test Container:**
   - In your Command Prompt or PowerShell, execute:
     ```bash
     docker run hello-world
     ```
   - This command downloads a test image and runs it in a container. A success message confirms that your installation is working.

## Troubleshooting

- **WSL 2 Issues:**
  - Ensure that virtualization is enabled in your BIOS/UEFI settings.
  - If Docker Desktop suggests enabling WSL 2, follow the on-screen instructions, or refer to the [Docker documentation](https://docs.docker.com/desktop/windows/wsl/) for more details.
- **Permission Issues:**
  - If you encounter permission issues during installation, try running the installer as an administrator.
- **Network Issues:**
  - Ensure that your firewall or antivirus is not blocking Docker Desktop. Refer to your security software documentation for details on whitelisting applications.

## Additional Resources

- [Docker Documentation](https://docs.docker.com/get-started/)
- [Docker Community Forums](https://forums.docker.com/)
- [WSL 2 Installation Guide](https://docs.microsoft.com/en-us/windows/wsl/install)
