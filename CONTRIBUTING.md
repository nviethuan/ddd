## Contributing to Documentation

We greatly welcome your contributions to the documentation of this project. Below are the steps you can follow to contribute:

1. **Clone the project**: clone project using command `git clone`. Open terminal and run command:

   ```bash
   git clone <repository-url>
   ```

2. **Create a new branch**: Create a new branch from the `master` branch to make your changes. Name the branch according to the feature or bug fix you are working on, for example: `your-branch-name`.

   ```bash
   git checkout -b <your-branch-name>
   ```

3. **Make changes**: Make the necessary changes in the documentation. Ensure that you adhere to the project's writing rules and style.

    a. App
      - Add new in the `apps` directory: `npx nest g app <app-name>`.

    b. Common
      - Add new in the `common` directory: `npx nest g class|decorator|pipe|filter|guard|interceptor|middleware|module|service|controller|exception|filter|interceptor|pipe|resolver infrastructure/<name>`, when you run the command, the library schematic prompts you for a question:

        ```
          ? Which project would you like to generate to? 
            api [ Default ] 
            modules 
            api-prod 
            cli 
          ❯ common 
            mongodb
        ```
        -> Please choose `common`.


    c. Library
      - Add new in the `library` directory: `npx nest g library <name>` - [read more](https://docs.nestjs.com/cli/libraries), when you run the command, the library schematic prompts you for a question same as `b. Common`.

    d. Module
      - Add new in the `modules` directory: `npx nest g resource <name>` - [read more](https://docs.nestjs.com/recipes/crud-generator), when you run the command, the library schematic prompts you for a question same as `b. Common`.

4. **Review changes**: Before committing, carefully review your changes to ensure there are no spelling or grammatical errors.

5. **Commit changes**: Commit your changes with a clear and meaningful commit message.

   ```bash
   git commit -m "Update documentation: Add contribution guidelines"
   ```

6. **Push branch to GitHub**: Push your branch to your GitHub repository.

   ```bash
   git push origin <your-branch-name>
   ```

7. **Create a Pull Request**: Create a Pull Request from your branch to the `master` branch of the original project. In the Pull Request, clearly describe the changes you have made and why they are necessary.

We appreciate all your contributions and look forward to working with you to improve the documentation of this project. Thank you for contributing!
