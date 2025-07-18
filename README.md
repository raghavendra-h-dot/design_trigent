# design_trigent

This application is intended for all marketing personnel and will serve as a centralized platform to access various types of design elements.

Technology Stack: The frontend will be developed using React. The backend technology is open for recommendations based on scalability, performance, and project requirements.

Key Details:
- Target Audience: Primarily Marketing, Presales, and Sales teams. Project Managers may also use the application occasionally.
- Purpose: To provide key design assets such as decks, icons, infographics, PDFs, and other materials for the above users.
- Search Functionality: Users can search using service-wise or industry-wise keywords to find relevant design elements.
- Brand Guidelines: The application will also include Trigent’s detailed brand guidelines.
- User Uploads:
  - To upload content, users must sign up with email verification, after which an admin must approve the account.
  - During the upload process, users will need to provide:
    - Type of design (e.g., Case Study, Brochure, Icons, Infographic, Service, Industry, etc.)
    - File format (e.g., PDF, PPT/X, DOC/X, SVG, PNG, JPG)
    - Tags (keywords for search, defined by the user)
    - Description (also defined by the user)
- User Interface: The UI will be simple, similar to Google Search.
- Search Results: Results will be shown in a tabbed view—All, Infographics, Icons, Decks, PDFs, etc.
- Element Access: Users can view details of each item and download them as needed.
- Security Feature (Optional): We may implement restrictions to limit access (especially for viewing and downloading) to users within the Trigent network.


Figma URL: https://www.figma.com/proto/zRDrqLs9YqQpUzmnU7NGUx/Brand?node-id=617-8446&starting-point-node-id=320%3A8043&t=iqyzVFfPWilFIEx5-1

Roles:
- Super Admin - Manage all admins, roles, assets, upload, approve/reject. 
- Admin - View, Download, Upload, Manage their invited people, Approve/Reject assets or content.
- Standard - View, Download and Upload
- View - View and Download

Page Functionality:
- Search screen
  - This is the home screen for every one.
  - Searching the assets.
  - Links will be provided (All, Icons, PDF, PPT, Stock Images, Infographic).
  - Once the user clicks on login signle signon screen will appear
  - After successfull login user lands here with message about his access (refer the figma screen - Modal-UploadRequest).
